import React from 'react';
import CustomTabBar, { CustomTabPane } from '../../../../../components/molecules/TabBar';
import { MatchType, ActionType } from '../../../constants';
import { globalDispatch } from '../../../../../utils';
import styles from './styles.less';

interface IProps {
  currentMatchType: MatchType;
}

function handleMatchTypeChange(matchType: any) {
  globalDispatch({
    type: ActionType.change_current_match_type_with_namespace,
    payload: matchType as MatchType
  });
}

const TabBar: React.FC<IProps> = (props: IProps) => (
  <CustomTabBar
    defaultActiveKey={MatchType.predict}
    onChange={handleMatchTypeChange}
    className={styles.tabBar}
    withTabBarBottomBorder={false}
  >
    <CustomTabPane tab="赛事预告" key={MatchType.predict} />
    <CustomTabPane tab="赛事结果" key={MatchType.result} />
  </CustomTabBar>
);

export default TabBar;
