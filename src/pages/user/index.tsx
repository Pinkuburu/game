// /**
//  * title: 个人中心
//  * Routes:
//  *   - ./src/components/molecules/Authorized
//  */
import React from 'react';
import CustomTabBar, { CustomTabPane } from '../../components/molecules/TabBar';
import Member from './components/Member';
import Account from './components/Account';
import Suggestion from './components/Suggestion';

enum PersonalCenterPageEnum {
  Member = 'member',
  Account = 'account',
  Suggestion = 'suggestion'
}

interface IProps {
  userInfo: any;
  userMemberInfo: any[];
}

export default class PersonalCenter extends React.Component<IProps> {
  render() {
    return (
      <CustomTabBar
        defaultActiveKey={PersonalCenterPageEnum.Member}
        activeBorderPosition="Top"
        activeWithMark={true}
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
