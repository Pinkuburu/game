import React from 'react';
import CustomTabBar, { CustomTabPane } from '../../molecules/Tabs';
import styles from './styles.less';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgetForm from './ForgetForm';

import { Tabs } from 'antd';
const { TabPane } = Tabs;
interface IProps {}
interface IState {
  isForget: boolean;
}

export enum InputType {
  MOB,
  PSW,
  SMS,
  REPSW
}

export default class LoginModal extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isForget: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isForget: !this.state.isForget });
  }

  render() {
    const { isForget } = this.state;
    return (
      <>
        {isForget ? (
          <ForgetForm toggle={this.toggle} />
        ) : (
          <CustomTabBar
            defaultActiveKey="login"
            isTabBarFullContainer={true}
            tabBarHeight="Big"
            isTabFullTabBar={true}
          >
            <CustomTabPane tab="登录" key="login">
              <LoginForm toggle={this.toggle} />
            </CustomTabPane>
            <CustomTabPane tab="注册" key="register">
              <RegisterForm />
            </CustomTabPane>
          </CustomTabBar>
        )}
      </>
    );
  }
}
