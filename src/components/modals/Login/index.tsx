import React from 'react';
import CustomTabBar from '../../molecules/TabBar';
import styles from './styles.less';
import { Tabs, Input } from 'antd';
import GTVertify, { GTVertifyName } from '../../atoms/GTVertify';
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
    return (
      <CustomTabBar defaultActiveKey="login" className={styles.loginContainer}>
        <TabPane tab="登录" key="login">
          <div>
            <Input
              placeholder="手机号"
              allowClear={true}
              height={44}
              prefix={<span className={styles.icon} />}
            />
            <Input
              placeholder="手机号"
              allowClear={true}
              height={44}
              prefix={<span className={styles.icon} />}
            />
          </div>
          <GTVertify GTVertifyName={GTVertifyName.LOGIN} />
        </TabPane>
        <TabPane tab="注册" key="register">
          <div>is</div>
        </TabPane>
      </CustomTabBar>
    );
  }
}
