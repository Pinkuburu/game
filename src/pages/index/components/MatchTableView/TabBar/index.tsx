import React from 'react';
import CustomTabBar, { CustomTabPane } from '../../../../../components/molecules/TabBar';
import { MatchType, ActionType, NAMESPACE } from '../../../constants';
import { globalDispatch } from '../../../../../utils';
import styles from './styles.less';

interface IProps {
  currentMatchType: MatchType;
}

function handleMatchTypeChange(matchType: any) {
  globalDispatch({
    type: `${NAMESPACE.MATCH}/${ActionType.change_current_match_type}`,
    payload: matchType as MatchType
  });
}

const TabBar: React.FC<IProps> = (props: IProps) => (
  <CustomTabBar
    defaultActiveKey={MatchType.predict}
    onChange={handleMatchTypeChange}
    className={styles.tabBar}
  >
    <CustomTabPane tab="赛事预告" key={MatchType.predict} />
    <CustomTabPane tab="赛事结果" key={MatchType.result} />
  </CustomTabBar>
);

export default TabBar;
