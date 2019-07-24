import React from 'react';
import CustomInput from '../../atoms/Input';
import GTVerify, { GTVerifyName } from '../../atoms/GTVerify';
import Button from '../../atoms/Button';
import { CustomCheckbox } from '../../atoms/CheckBox';

import styles from './styles.less';
import { ActionType } from '../../../models/constants';
import { isPureNumber } from '../../../utils/';
import Api from '../../../service/request/api';
import { InputType } from './index';
import Icon from './components/Icon';
import SendSmsBtn from './components/SendSmsBtn';

interface IProps {}
interface IState {
  canLogin: boolean;
  loginWithSMS: boolean;
  isSendSMS: boolean;
  mob: string;
  psw: string;
  sms: string;
}

export default class LoginTabPane extends React.PureComponent<IProps, IState> {
  GTVerify: React.RefObject<any>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      loginWithSMS: true,
      canLogin: false,
      isSendSMS: false,
      mob: '',
      psw: '',
      sms: ''
    };
    this.GTVerify = React.createRef();
    this.handleToggleLoginWayClick = this.handleToggleLoginWayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.sendSMS = this.sendSMS.bind(this);
    this.resetIsSendSMS = this.resetIsSendSMS.bind(this);
  }

  handleToggleLoginWayClick() {
    this.setState({
      loginWithSMS: !this.state.loginWithSMS
    });
  }

  handleInputChange(type: InputType, e: React.ChangeEvent<HTMLInputElement>) {
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

  // 发送短信验证码
  sendSMS() {
    Api.sendSmsForLogin({ mobile: '15602978360' }).then(() => {
      this.setState({
        isSendSMS: true
      });
    });
  }

  // 重置获取验证码的状态
  resetIsSendSMS() {
    this.setState({
      isSendSMS: false
    });
  }

  doLogin() {
    (window as any).g_app._store.dispatch({
      type: ActionType.do_login_with_namespace
    });
  }

  render() {
    const { loginWithSMS, isSendSMS, psw, sms, mob } = this.state;
    return (
      <div className={styles.formContainer}>
        <CustomInput
          placeholder="手机号"
          prefixIcon={<Icon type="phone" />}
          activePrefixIcon={<Icon type="phoneS" />}
          onChange={this.handleInputChange.bind(this, InputType.MOB)}
          value={mob}
          maxLength={11}
        />
        <br />
        {this.buildPSW(loginWithSMS, isSendSMS, sms, psw)}
        <br />
        <GTVerify GTVerifyName={GTVerifyName.LOGIN} ref={this.GTVerify} />

        {this.buildToggleLoginWay(loginWithSMS)}

        <div className={styles.aboutPSW}>
          <CustomCheckbox>记住密码</CustomCheckbox>
          <span>忘记密码</span>
        </div>
        <Button onClick={this.doLogin}>登录</Button>
      </div>
    );
  }

  buildPSW(loginWithSMS: boolean, isSendSms: boolean, sms: string, psw: string) {
    return loginWithSMS ? (
      <CustomInput
        placeholder="短信验证码"
        prefixIcon={<Icon type="sms" />}
        activePrefixIcon={<Icon type="smsS" />}
        suffixIcon={<SendSmsBtn isActive={false} isSendSms={isSendSms} />}
        activeSuffixIcon={<SendSmsBtn isActive={true} isSendSms={isSendSms} />}
        onChange={this.handleInputChange.bind(this, InputType.SMS)}
        value={sms}
      />
    ) : (
      <CustomInput
        placeholder="密码"
        prefixIcon={<Icon type="password" />}
        activePrefixIcon={<Icon type="passwordS" />}
        type="password"
        onChange={this.handleInputChange.bind(this, InputType.PSW)}
        value={psw}
      />
    );
  }
  buildToggleLoginWay(loginWithSMS: boolean) {
    return (
      <span className={styles.toggleLoginWay} onClick={this.handleToggleLoginWayClick}>
        {loginWithSMS ? '密码登录 ->' : '手机验证码登录 ->'}
      </span>
    );
  }
}
