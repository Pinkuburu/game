import React from 'react';
import CustomInput from '../../atoms/Input';
import GTVertify, { GTVertifyName } from '../../atoms/GTVertify';
import Button from '../../atoms/Button';
import { CustomCheckbox } from '../../atoms/CheckBox';
import classnames from 'classnames';
import styles from './styles.less';
import { ActionType } from '../../../models/constants';
import { isPureNumber } from '../../../utils/';

interface IProps {}
interface IState {
  canLogin: boolean;
  loginWithSMS: boolean;
  tel: string;
  psw: string;
  sms: string;
}

enum InputType {
  TEL,
  PSW,
  SMS
}

export default class LoginTabPane extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loginWithSMS: false,
      canLogin: false,
      tel: '',
      psw: '',
      sms: ''
    };
    this.handleToggleLoginWayClick = this.handleToggleLoginWayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  handleToggleLoginWayClick() {
    this.setState({
      loginWithSMS: !this.state.loginWithSMS
    });
  }

  handleInputChange(type: InputType, e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    switch (type) {
      case InputType.TEL:
        isPureNumber(value) && this.setState({ tel: value });
        break;
      case InputType.PSW:
        this.setState({ psw: value.trim() });
        break;
      case InputType.SMS:
        isPureNumber(value) && this.setState({ sms: value });
        break;
    }
  }

  doLogin() {
    (window as any).g_app._store.dispatch({
      type: ActionType.do_login_with_namespace
    });
  }

  render() {
    const { loginWithSMS, psw, sms, tel } = this.state;
    return (
      <div className={styles.loginFormContainer}>
        <CustomInput
          placeholder="手机号"
          prefixIcon={this.buildPrefixIcon(styles.phone)}
          activePrefixIcon={this.buildPrefixIcon(styles.phoneS)}
          onChange={this.handleInputChange.bind(this, InputType.TEL)}
          value={tel}
          maxLength={11}
        />
        <br />
        {this.buildPSW(loginWithSMS, sms, psw)}
        <br />
        <GTVertify GTVertifyName={GTVertifyName.LOGIN} />
        {this.buildToggleLoginWay(loginWithSMS)}
        <div className={styles.aboutPSW}>
          <CustomCheckbox>记住密码</CustomCheckbox>
          <span>忘记密码</span>
        </div>
        <Button onClick={this.doLogin}>登录</Button>
      </div>
    );
  }
  buildPrefixIcon(className: string) {
    return <span className={classnames(styles.icon, className)} />;
  }
  buildReSendSMS() {
    return <span className={styles.reSendSMS}>（60秒后重新发送）</span>;
  }
  buildPSW(loginWithSMS: boolean, sms: string, psw: string) {
    return loginWithSMS ? (
      <CustomInput
        placeholder="短信验证码"
        prefixIcon={this.buildPrefixIcon(styles.sms)}
        activePrefixIcon={this.buildPrefixIcon(styles.smsS)}
        suffixIcon={this.buildSendSMS(false)}
        activeSuffixIcon={this.buildSendSMS(true)}
        onChange={this.handleInputChange.bind(this, InputType.SMS)}
        value={sms}
      />
    ) : (
      <CustomInput
        placeholder="密码"
        prefixIcon={this.buildPrefixIcon(styles.password)}
        activePrefixIcon={this.buildPrefixIcon(styles.passwordS)}
        type="password"
        onChange={this.handleInputChange.bind(this, InputType.PSW)}
        value={psw}
      />
    );
  }
  buildToggleLoginWay(loginWithSMS: boolean) {
    return (
      <span className={styles.toggleLoginWay} onClick={this.handleToggleLoginWayClick}>
        {loginWithSMS ? '手机验证码登录 ->' : '密码登录 ->'}
      </span>
    );
  }
  buildSendSMS(isActive: boolean) {
    return (
      <Button
        type="Default"
        className={classnames(styles.sendSMS, { [styles.sendSMSS]: isActive })}
      >
        获取验证码
      </Button>
    );
  }
}
