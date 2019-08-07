import React from 'react';
import CustomTabBar, { CustomTabPane } from '../../molecules/TabBar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgetForm from './ForgetForm';

interface IProps {
  defaultActiveKey?: 'login' | 'register';
}
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
  static defaultProps = {
    defaultActiveKey: 'login'
  };

  constructor(props: IProps) {
    super(props);
    this.state = { isForget: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isForget: !this.state.isForget });
  }

  render() {
    const { defaultActiveKey } = this.props;
    const { isForget } = this.state;
    return (
      <>
        {isForget ? (
          <ForgetForm toggle={this.toggle} />
        ) : (
          <CustomTabBar
            defaultActiveKey={defaultActiveKey as string}
            isTabBarFullContainer={true}
            tabBarHeight="Big"
            isTabFullTabBar={true}
            withTabBarBottomBorder={true}
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
