import React from 'react';
import CustomInput from '../../atoms/Input';
import GTVerify, { GTVerifyName } from '../../atoms/GTVerify';
import Button from '../../atoms/Button';
import { CustomCheckbox } from '../../atoms/CheckBox';
import { isMobile, isPassword, isSmsCode, globalDispatch, NAMESPACE } from '../../../utils/';
import styles from './styles.less';
import { ActionType } from '../../../models/constants';
import Api from '../../../service/request/api';
import { InputType } from './index';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface IProps {
  toggle: () => void;
}
interface IState {
  loginWithSMS: boolean;
  isRememberMe: boolean;
  mob: string;
  psw: string;
  sms: string;
  errMsg: string;
}

export default class LoginForm extends React.PureComponent<IProps, IState> {
  GTVerify: React.RefObject<GTVerify>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      loginWithSMS: true,
      isRememberMe: false,
      mob: '',
      psw: '',
      sms: '',
      errMsg: ''
    };
    this.GTVerify = React.createRef();
    this.handleToggleLoginWayClick = this.handleToggleLoginWayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.sendSMS = this.sendSMS.bind(this);
  }

  // 切换登录方式
  handleToggleLoginWayClick() {
    // 重置图形验证
    this.GTVerify.current && this.GTVerify.current.resetGTVerify();
    this.setState({
      loginWithSMS: !this.state.loginWithSMS
    });
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>, type: InputType) {
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
  handleRememberMeChange(e: CheckboxChangeEvent) {
    const { checked } = e.target;
    this.setState({ isRememberMe: checked });
  }

  // 发送短信验证码
  async sendSMS() {
    if (this.canSendSms()) {
      const { mob } = this.state;
      try {
        await Api.sendSmsForLogin({ mobile: mob });
        return true;
      } catch (err) {
        const { msg = '未知错误' } = err;
        this.setState({ errMsg: msg });
        return false;
      }
    }
    return false;
  }

  // 登录
  doLogin() {
    if (this.canLogin()) {
      const { sms, mob, psw, loginWithSMS } = this.state;
      const verifyInfo = this.GTVerify.current && this.GTVerify.current.getGTVerifyInfo();
      const partOfLoginParams: any = {};
      if (loginWithSMS) {
        partOfLoginParams.login_type = 1;
        partOfLoginParams.code = sms;
      } else {
        partOfLoginParams.login_type = 2;
        partOfLoginParams.password = psw;
      }
      globalDispatch({
        type: `${NAMESPACE.AUTH}/${ActionType.do_login}`,
        payload: {
          mobile: mob,
          GTVerify: this.GTVerify.current,
          ...partOfLoginParams,
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

  // 是否可以进行登录
  canLogin(): boolean {
    const { mob, sms, psw, loginWithSMS } = this.state;
    if (!isMobile(mob)) {
      this.setState({ errMsg: '请先输入正确的手机号' });
      return false;
    }
    if (loginWithSMS) {
      if (!isSmsCode(sms)) {
        this.setState({ errMsg: '请先输入正确的短信验证码' });
        return false;
      }
    } else {
      if (!isPassword(psw)) {
        this.setState({ errMsg: '请先输入正确的密码' });
        return false;
      }
    }
    if (!(this.GTVerify.current && this.GTVerify.current.verifySuccessRes)) {
      this.setState({ errMsg: '请先进行图形验证' });
      return false;
    }
    this.setState({ errMsg: '' });
    return true;
  }

  render() {
    const { loginWithSMS, psw, sms, mob, errMsg, isRememberMe } = this.state;
    const { toggle } = this.props;
    return (
      <div className={styles.formContainer}>
        <CustomInput
          placeholder="手机号"
          limit="PureNumber"
          inputIcon="Mobile"
          tag={InputType.MOB}
          onChange={this.handleInputChange}
          value={mob}
          maxLength={11}
        />
        <br />
        {/* 用三元运算会导致后面切换的sufix图标不变 */}
        {loginWithSMS && this.buildSmsInput(sms)}
        {!loginWithSMS && this.buildPswInput(psw)}
        <br />
        <GTVerify GTVerifyName={GTVerifyName.LOGIN} ref={this.GTVerify} />
        <span className={styles.toggle} onClick={this.handleToggleLoginWayClick}>
          {loginWithSMS ? '密码登录 ->' : '手机验证码登录 ->'}
        </span>
        <div className={styles.aboutPSW}>
          <CustomCheckbox checked={isRememberMe} onChange={this.handleRememberMeChange}>
            记住密码
          </CustomCheckbox>
          <span onClick={toggle}>忘记密码</span>
        </div>
        {errMsg && <p className={styles.errMsg}>{errMsg}</p>}

        <Button onClick={this.doLogin}>登录</Button>
      </div>
    );
  }

  buildSmsInput(sms: string) {
    return (
      <CustomInput
        placeholder="短信验证码"
        limit="PureNumber"
        inputIcon="SmsCode"
        withSendSmsBtn={true}
        maxLength={6}
        tag={InputType.SMS}
        onChange={this.handleInputChange}
        sendSms={this.sendSMS}
        value={sms}
      />
    );
  }

  buildPswInput(psw: string) {
    return (
      <CustomInput
        placeholder="密码"
        type="password"
        minLength={8}
        maxLength={16}
        inputIcon="Password"
        tag={InputType.PSW}
        onChange={this.handleInputChange}
        value={psw}
      />
    );
  }
}
