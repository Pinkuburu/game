import React from 'react';
import { Tabs } from 'antd';
import Table from '../../../../../components/atoms/Table';
import CustomTabBar from '../../../../../components/molecules/TabBar';
import styles from './styles.less';
const { TabPane } = Tabs;

interface IProps {}

export default class TableView extends React.Component<IProps> {
  componentDidMount() {
    this.getNext7Days();
  }

  getNext7Days() {}

  render() {
    return (
      <div>
        <CustomTabBar className={styles.dateTabBar}>
          <TabPane tab="09-12 周一" key="1" className={styles.tabPane} />
          <TabPane tab="09-12 周一" key="2" />
          <TabPane tab="09-12 周一" key="3" />
          <TabPane tab="09-12 周一" key="4" />
          <TabPane tab="09-12 周一" key="5" />
          <TabPane tab="09-12 周一" key="6" />
          <TabPane tab="09-12 周一" key="7" />
        </CustomTabBar>
        <Table />
      </div>
    );
  }
}
