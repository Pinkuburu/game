import React from 'react';
import CustomTabBar from '../../molecules/TabBar';
import styles from './styles.less';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
interface IProps {}

export enum InputType {
  MOB,
  PSW,
  SMS
}

export default class LoginModal extends React.PureComponent<IProps> {
  render() {
    return (
      <CustomTabBar defaultActiveKey="register" className={styles.loginContainer}>
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
