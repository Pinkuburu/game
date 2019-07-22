import React from 'react';
import CustomTab from '../../../../../components/molecules/TabBar';
import { MatchType, ActionType } from '../../../constants';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
interface IProps {
  currentMatchType: MatchType;
}

function handleMatchTypeChange(matchType: any) {
  (window as any).g_app._store.dispatch({
    type: ActionType.change_current_match_type_with_namespace,
    payload: matchType
  });
}

const TabBar: React.FC<IProps> = (props: IProps) => (
  <CustomTab defaultActiveKey={props.currentMatchType} onChange={handleMatchTypeChange}>
    <TabPane tab="赛事预告" key={MatchType.predict} />
    <TabPane tab="赛事结果" key={MatchType.result} />
  </CustomTab>
);

export default TabBar;
