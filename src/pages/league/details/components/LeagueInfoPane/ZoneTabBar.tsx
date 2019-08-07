import React from 'react';
import TabBar, { CustomTabPane } from '@/components/molecules/TabBar';
import * as DataType from '@/common/interfaces/dataType';

import styles from './styles.less';

interface IProps {
  tabItemList: DataType.PartationItem[];
}

export default class ZoneTabBar extends React.PureComponent<IProps> {
  render() {
    const { tabItemList } = this.props;
    const defaultActiveKey = tabItemList[0] && tabItemList[0].id.toString();
    return (
      <TabBar
        defaultActiveKey={defaultActiveKey}
        activeBorderPosition="Top"
        activeWithMark={true}
        className={styles.zoneContainer}
      >
        {tabItemList.map((item) => (
          <CustomTabPane key={item.id.toString()} tab={item.name} />
        ))}
      </TabBar>
    );
  }
}
