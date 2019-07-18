import React from 'react';
import { Tabs } from 'antd';
import CustomTab from '../../../../../components/molecules/TabBar';
const { TabPane } = Tabs;
// import styles from './styles.less';

const TabBar: React.FC = () => (
  <CustomTab defaultActiveKey="1">
    <TabPane tab="赛事预告" key="1" />
    <TabPane tab="赛事结果" key="2" />
  </CustomTab>
);

export default TabBar;
