import React from 'react';
import CustomInput from '../../atoms/Input';
import GTVerify, { GTVerifyName } from '../../atoms/GTVerify';
import Button from '../../atoms/Button';
import styles from './styles.less';

import { ActionType } from '../../../models/constants';
import { isPureNumber, isMobile, isPassword, isSmsCode } from '../../../utils/';
import Api from '../../../service/request/api';
import { InputType } from './index';
import Icon from './components/Icon';
import SendSmsBtn from './components/SendSmsBtn';

interface IProps {}
interface IState {
  canSendSms: boolean;
  isSendSms: boolean;
  mob: string;
  psw: string;
  sms: string;
  errMsg: String;
}

export default class RegisterTabPane extends React.PureComponent<IProps, IState> {
  GTVerify: React.RefObject<GTVerify>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSendSms: true,
      canSendSms: false,
      mob: '',
      psw: '',
      sms: '',
      errMsg: ''
    };
    this.GTVerify = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.sendSms = this.sendSms.bind(this);
    this.resetSendSms = this.resetSendSms.bind(this);
    this.handleGTVerifySuccess = this.handleGTVerifySuccess.bind(this);
  }

  handleInputChange(type: InputType, e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    switch (type) {
      case InputType.MOB:
        isPureNumber(value) && this.setState({ mob: value });
        break;
      case InputType.PSW:
        this.setState({ psw: value.trim() });
        break;
      case InputType.SMS:
        isPureNumber(value) && this.setState({ sms: value });
        break;
    }
  }

  // 发送验证短信
  sendSms() {
    const { mob } = this.state;
    if (isMobile(mob)) {
      this.setState({ errMsg: '' });
      Api.sendSmsForRegister({ mobile: mob })
        .then(() => {
          this.setState({ isSendSms: true, errMsg: '' });
        })
        .catch((err) => {
          const { msg = '未知错误' } = err;
          this.setState({ errMsg: msg });
        });
    } else {
      this.setState({ errMsg: '请输入正确的手机号' });
    }
  }

  // 重置发送验证短信按钮
  resetSendSms() {
    this.setState({ isSendSms: false });
  }

  doRegister() {
    if (this.canRegister()) {
      const { sms, mob, psw } = this.state;
      const verifyRes = this.GTVerify.current && this.GTVerify.current.verifySuccessRes;
      Api.doRegister({
        mobile: mob,
        code: sms,
        password: psw,
        ...verifyRes
      });
    }
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

  // 图形验证成功
  handleGTVerifySuccess(verifyRes: any) {
    this.setState({
      canSendSms: true
    });
  }

  render() {
    const { isSendSms, mob, psw, sms, errMsg, canSendSms } = this.state;
    return (
      <div className={styles.formContainer}>
        <CustomInput
          placeholder="手机号"
          prefixIcon={<Icon type="phone" />}
          activePrefixIcon={<Icon type="phoneS" />}
          maxLength={11}
          value={mob}
          onChange={this.handleInputChange.bind(this, InputType.MOB)}
        />
        <br />
        <GTVerify
          GTVerifyName={GTVerifyName.REGISTER}
          onSuccess={this.handleGTVerifySuccess}
          ref={this.GTVerify}
        />
        <br />
        <CustomInput
          placeholder="短信验证码"
          prefixIcon={<Icon type="sms" />}
          activePrefixIcon={<Icon type="smsS" />}
          suffixIcon={this.buildSendSmsBtn(false, isSendSms)}
          activeSuffixIcon={this.buildSendSmsBtn(canSendSms, isSendSms)}
          value={sms}
          maxLength={6}
          minLength={6}
          onChange={this.handleInputChange.bind(this, InputType.SMS)}
        />
        <br />
        <CustomInput
          placeholder="设置密码8-16个字符"
          prefixIcon={<Icon type="password" />}
          activePrefixIcon={<Icon type="passwordS" />}
          type="password"
          value={psw}
          minLength={8}
          maxLength={16}
          onChange={this.handleInputChange.bind(this, InputType.PSW)}
        />
        <br />
        {errMsg && <p className={styles.errMsg}>{errMsg}</p>}
        <Button onClick={this.doRegister}>注册</Button>
      </div>
    );
  }
  buildSendSmsBtn(isActive: boolean, isSendSms: boolean) {
    return (
      <SendSmsBtn
        isActive={isActive}
        isSendSms={isSendSms}
        onClick={this.sendSms}
        onCountDownEnd={this.resetSendSms}
      />
    );
  }
}
