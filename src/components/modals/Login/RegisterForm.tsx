import React from 'react';
import CustomInput from '../../atoms/Input';
import GTVertify, { GTVertifyName } from '../../atoms/GTVertify';
import Button from '../../atoms/Button';
import classnames from 'classnames';
import styles from './styles.less';

interface IProps {}
interface IState {
  //   canLogin: boolean;
  //   loginWithSMS: boolean;
}

export default class RegisterTabPane extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loginWithSMS: false,
      canLogin: false
    };
  }

  render() {
    return (
      <div className={styles.loginFormContainer}>
        <CustomInput
          placeholder="手机号"
          prefixIcon={this.buildPrefixIcon(styles.phone)}
          activePrefixIcon={this.buildPrefixIcon(styles.phoneS)}
        />
        <br />
        <GTVertify GTVertifyName={GTVertifyName.REGISTER} />
        <br />
        <CustomInput
          placeholder="短信验证码"
          prefixIcon={this.buildPrefixIcon(styles.sms)}
          activePrefixIcon={this.buildPrefixIcon(styles.smsS)}
          suffixIcon={this.buildSendSMS(false)}
          activeSuffixIcon={this.buildSendSMS(true)}
        />
        <br />
        <CustomInput
          placeholder="密码"
          prefixIcon={this.buildPrefixIcon(styles.password)}
          activePrefixIcon={this.buildPrefixIcon(styles.passwordS)}
          type="password"
        />
        <Button>注册</Button>
      </div>
    );
  }
  buildPrefixIcon(className: string) {
    return <span className={classnames(styles.icon, className)} />;
  }
  buildReSendSMS() {
    return <span className={styles.reSendSMS}>（60秒后重新发送）</span>;
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
