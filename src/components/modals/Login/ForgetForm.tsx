import React from 'react';
import CustomInput from '../../atoms/Input';
import GTVerify, { GTVerifyName } from '../../atoms/GTVerify';
import Button from '../../atoms/Button';
import styles from './styles.less';

import { ActionType } from '../../../models/constants';
import { isMobile, isPassword, isSmsCode, globalDispatch, NAMESPACE } from '../../../utils/';
import Api from '../../../service/request/api';
import { InputType } from './index';
import classnames from 'classnames';

interface IProps {
  toggle: () => void;
}
interface IState {
  isVerifySmsCode: boolean;
  mob: string;
  psw: string;
  rePsw: string;
  sms: string;
  errMsg: String;
}

export default class ForgetForm extends React.PureComponent<IProps, IState> {
  GTVerify: React.RefObject<GTVerify>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      mob: '',
      psw: '',
      sms: '',
      errMsg: '',
      rePsw: '',
      isVerifySmsCode: false
    };
    this.GTVerify = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.sendSms = this.sendSms.bind(this);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>, type?: InputType) {
    const { value } = e.target;
    switch (type) {
      case InputType.MOB:
        this.setState({ mob: value });
        break;
      case InputType.PSW:
        this.setState({ psw: value });
        break;
      case InputType.SMS:
        this.setState({ sms: value });
        break;
      case InputType.REPSW:
        this.setState({ rePsw: value });
        break;
    }
  }
  // 点击了下一步或者重设密码
  onClick() {
    const { isVerifySmsCode } = this.state;
    isVerifySmsCode ? this.doResetPassword() : this.doIdentify();
  }
  // 发送验证短信
  async sendSms() {
    if (this.canSendSms()) {
      const { mob } = this.state;
      try {
        await Api.sendSmsForForget({ mobile: mob });
        return true;
      } catch (err) {
        const { msg = '未知错误' } = err;
        this.setState({ errMsg: msg });
        return false;
      }
    }
    return false;
  }
  // 确认身份
  async doIdentify() {
    if (this.canIdentify()) {
      const { sms, mob } = this.state;
      const verifyInfo = this.GTVerify.current && this.GTVerify.current.getGTVerifyInfo();
      try {
        verifyInfo &&
          (await Api.checkForForget({
            mobile: mob,
            code: sms,
            ...verifyInfo
          }));
        this.setState({ isVerifySmsCode: true });
      } catch (error) {
        this.GTVerify.current && this.GTVerify.current.resetGTVerify();
      }
    }
  }

  // 重设密码
  doResetPassword() {
    if (this.canResetPassword()) {
      const { sms, mob, psw } = this.state;
      globalDispatch({
        type: `${NAMESPACE.AUTH}/${ActionType.do_reset_password}`,
        payload: {
          mobile: mob,
          code: sms,
          password: psw
        }
      });
    }
  }

  // 是否可以发送短信
  canSendSms(): boolean {
    const { mob } = this.state;
    if (!isMobile(mob)) {
      this.setState({ errMsg: '请输入正确的手机号' });
      return false;
    }
    const verifyRes = this.GTVerify.current && this.GTVerify.current.verifySuccessRes;
    if (!verifyRes) {
      this.setState({ errMsg: '请先进行图形验证' });
      return false;
    }
    this.setState({ errMsg: '' });
    return true;
  }

  // 可以进行身份验证
  canIdentify(): boolean {
    const { mob, sms } = this.state;
    if (!isMobile(mob)) {
      this.setState({ errMsg: '请先输入正确的手机号' });
      return false;
    }
    if (!isSmsCode(sms)) {
      this.setState({ errMsg: '请先输入正确的短信验证码' });
      return false;
    }
    if (!(this.GTVerify.current && this.GTVerify.current.verifySuccessRes)) {
      this.setState({ errMsg: '请先进行图形验证' });
      return false;
    }
    this.setState({ errMsg: '' });
    return true;
  }

  // 是否可以重设密码
  canResetPassword(): boolean {
    const { psw, rePsw } = this.state;
    if (!isPassword(psw)) {
      this.setState({ errMsg: '请先设置正确的密码' });
      return false;
    }
    if (rePsw !== psw) {
      this.setState({ errMsg: '两次密码输入不一致' });
      return false;
    }
    this.setState({ errMsg: '' });
    return true;
  }

  render() {
    const { mob, psw, sms, errMsg, rePsw, isVerifySmsCode } = this.state;
    const { toggle } = this.props;
    return (
      <div className={classnames(styles.formContainer, styles.forgetForm)}>
        <div className={styles.title}>{isVerifySmsCode ? '忘记密码' : '重置密码'}</div>
        {isVerifySmsCode
          ? this.buildAfterVerifySmsCode(psw, rePsw)
          : this.buildBeforeVerifySmsCode(mob, sms)}
        <span className={styles.toggle} onClick={toggle}>
          {'密码登录 ->'}
        </span>
        {errMsg && <p className={styles.errMsg}>{errMsg}</p>}
        <Button onClick={this.onClick}>{isVerifySmsCode ? '保存' : '下一步'}</Button>
      </div>
    );
  }

  buildBeforeVerifySmsCode(mob: string, sms: string) {
    return (
      <>
        <CustomInput
          placeholder="手机号"
          inputIcon="Mobile"
          limit="PureNumber"
          maxLength={11}
          value={mob}
          tag={InputType.MOB}
          onChange={this.handleInputChange}
        />
        <br />
        <GTVerify GTVerifyName={GTVerifyName.FORGET} ref={this.GTVerify} />
        <br />
        <CustomInput
          placeholder="短信验证码"
          inputIcon="SmsCode"
          withSendSmsBtn={true}
          value={sms}
          limit="PureNumber"
          maxLength={6}
          minLength={6}
          tag={InputType.SMS}
          onChange={this.handleInputChange}
          sendSms={this.sendSms}
        />
      </>
    );
  }
  buildAfterVerifySmsCode(psw: string, rePws: string) {
    return (
      <>
        <CustomInput
          placeholder="设置密码8-16个字符"
          inputIcon="Password"
          type="password"
          value={psw}
          minLength={8}
          maxLength={16}
          tag={InputType.PSW}
          onChange={this.handleInputChange}
        />
        <br />
        <CustomInput
          placeholder="设置密码8-16个字符"
          inputIcon="Password"
          type="password"
          value={rePws}
          minLength={8}
          maxLength={16}
          tag={InputType.REPSW}
          onChange={this.handleInputChange}
        />
      </>
    );
  }
}
