/**
 * title: 个人中心
 * Routes:
 *   - ./src/components/molecules/Authorized
 */
import React from 'react';
import { connect } from 'dva';
import CustomTabBar, { CustomTabPane } from '../../components/molecules/TabBar';
import Member from './components/Member';
import Account from './components/Account';
import Suggestion from './components/Suggestion';

enum PersonalCenterPageEnum {
  Member = 'member',
  Account = 'account',
  Suggestion = 'suggestion'
}

class PersonalCenter extends React.Component<{}> {
  render() {
    return (
      <CustomTabBar
        defaultActiveKey={PersonalCenterPageEnum.Member}
        activeBorderPosition="Top"
        activeWithMark={true}
        withTabBarBottomBorder={false}
      >
        <CustomTabPane key={PersonalCenterPageEnum.Member} tab="成为会员">
          <Member />
        </CustomTabPane>
        <CustomTabPane key={PersonalCenterPageEnum.Account} tab="账号安全">
          <Account />
        </CustomTabPane>
        <CustomTabPane key={PersonalCenterPageEnum.Suggestion} tab="意见反馈">
          <Suggestion />
        </CustomTabPane>
      </CustomTabBar>
    );
  }
}

interface ConnectState {}

export default connect((state: ConnectState) => ({}))(PersonalCenter);
