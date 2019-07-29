import React from 'react';
import CustomInput from '../../atoms/Input';
import GTVerify, { GTVerifyName } from '../../atoms/GTVerify';
import Button from '../../atoms/Button';
import styles from './styles.less';

import { ActionType } from '../../../models/constants';
import { isMobile, isPassword, isSmsCode, globalDispatch, NAMESPACE } from '../../../utils/';
import Api from '../../../service/request/api';
import { InputType } from './index';

interface IProps {}
interface IState {
  mob: string;
  psw: string;
  sms: string;
  errMsg: String;
}

export default class RegisterForm extends React.PureComponent<IProps, IState> {
  GTVerify: React.RefObject<GTVerify>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      mob: '',
      psw: '',
      sms: '',
      errMsg: ''
    };
    this.GTVerify = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.doRegister = this.doRegister.bind(this);
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
    }
  }

  // 发送验证短信
  async sendSms() {
    if (this.canSendSms()) {
      const { mob } = this.state;
      try {
        await Api.sendSmsForRegister({ mobile: mob });
        return true;
      } catch (err) {
        const { msg = '未知错误' } = err;
        this.setState({ errMsg: msg });
        return false;
      }
    }
    return false;
  }

  // 注册
  doRegister() {
    if (this.canRegister()) {
      const { sms, mob, psw } = this.state;
      const verifyInfo = this.GTVerify.current && this.GTVerify.current.getGTVerifyInfo();
      globalDispatch({
        type: `${NAMESPACE.AUTH}/${ActionType.do_register}`,
        payload: {
          mobile: mob,
          code: sms,
          password: psw,
          onError: () => this.GTVerify.current && this.GTVerify.current.resetGTVerify(),
          ...verifyInfo
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

  // 是否可以进行注册
  canRegister(): boolean {
    const { mob, sms, psw } = this.state;
    if (!isMobile(mob)) {
      this.setState({ errMsg: '请先输入正确的手机号' });
      return false;
    }
    if (!isSmsCode(sms)) {
      this.setState({ errMsg: '请先输入正确的短信验证码' });
      return false;
    }
    if (!isPassword(psw)) {
      this.setState({ errMsg: '请先设置正确的密码' });
      return false;
    }
    if (!(this.GTVerify.current && this.GTVerify.current.verifySuccessRes)) {
      this.setState({ errMsg: '请先进行图形验证' });
      return false;
    }
    this.setState({ errMsg: '' });
    return true;
  }

  render() {
    const { mob, psw, sms, errMsg } = this.state;
    return (
      <div className={styles.formContainer}>
        <CustomInput
          placeholder="手机号"
          inputIcon="Mobile"
          limit="PureNumber"
          maxLength={11}
          value={mob}
          tag={InputType.MOB}
          onChange={this.handleInputChange}
          className={styles.aboutInput}
        />
        <GTVerify
          GTVerifyName={GTVerifyName.REGISTER}
          ref={this.GTVerify}
          className={styles.aboutInput}
        />
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
          className={styles.aboutInput}
        />
        <CustomInput
          placeholder="设置密码8-16个字符"
          inputIcon="Password"
          type="password"
          value={psw}
          minLength={8}
          maxLength={16}
          tag={InputType.PSW}
          onChange={this.handleInputChange}
          className={styles.aboutInput}
        />

        {errMsg && <p className={styles.errMsg}>{errMsg}</p>}
        <Button onClick={this.doRegister} className={styles.button}>
          注册
        </Button>
      </div>
    );
  }
}
