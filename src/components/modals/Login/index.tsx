import React from 'react';
import CustomTabBar from '../../molecules/TabBar';
import styles from './styles.less';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
interface IProps {}
interface IState {
  canLogin: boolean;
  loginWithSMS: boolean;
}
export default class LoginModal extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loginWithSMS: false,
      canLogin: false
    };
  }

  render() {
    const { loginWithSMS } = this.state;
    return (
      <CustomTabBar defaultActiveKey="login" className={styles.loginContainer}>
        <TabPane tab="登录" key="login">
          <LoginForm />
        </TabPane>
        <TabPane tab="注册" key="register">
          <RegisterForm />
        </TabPane>
      </CustomTabBar>
    );
  }
}
