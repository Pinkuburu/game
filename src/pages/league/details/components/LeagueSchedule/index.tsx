import React from 'react';
import { connect } from 'dva';
import TabBar, { CustomTabPane } from '@/components/molecules/TabBar';
import * as DataType from '@/common/interfaces/dataType';
import styles from './styles.less';
import Schedules from './Schedules';
import Teams from './Teams';
import Rules from './Rules';

enum TabKey {
  SCHEDULE = 'schedule',
  TEAM = 'team',
  RULE = 'rule'
}

interface IProps {}

class LeagueSchedule extends React.PureComponent<IProps> {
  render() {
    return (
      <TabBar defaultActiveKey={TabKey.SCHEDULE} className={styles.leagueScheduleContainer}>
        <CustomTabPane key={TabKey.SCHEDULE} tab="联赛赛程">
          <Schedules />
        </CustomTabPane>
        <CustomTabPane key={TabKey.TEAM} tab="参赛队伍">
          <Teams />
        </CustomTabPane>
        <CustomTabPane key={TabKey.RULE} tab="比赛规则">
          <Rules />
        </CustomTabPane>
      </TabBar>
    );
  }
}

interface ConnectState {
  leagueDetails: any;
}

export default connect((state: ConnectState) => ({
  info: state.leagueDetails.info,
  partationList: state.leagueDetails.partationList
}))(LeagueSchedule);
