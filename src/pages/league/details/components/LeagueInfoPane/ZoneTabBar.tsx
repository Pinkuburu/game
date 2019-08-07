import React from 'react';
import TabBar, { CustomTabPane } from '@/components/molecules/TabBar';
import * as DataType from '@/common/interfaces/dataType';
import { globalDispatch } from '@/utils';
import { ActionType, NAMESPACE } from '../../../constant';
import styles from './styles.less';

interface IProps {
  tabItemList: DataType.PartationItem[];
}

export default class ZoneTabBar extends React.PureComponent<IProps> {
  onChange(tabKey: string) {
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.change_current_zone_id}`,
      payload: tabKey
    });
  }

  render() {
    const { tabItemList } = this.props;
    const defaultActiveKey = tabItemList[0] && tabItemList[0].id.toString();
    return (
      <TabBar
        defaultActiveKey={defaultActiveKey}
        activeBorderPosition="Top"
        activeWithMark={true}
        className={styles.zoneContainer}
        onChange={this.onChange}
      >
        {tabItemList.map((item) => (
          <CustomTabPane key={item.id.toString()} tab={item.name} />
        ))}
      </TabBar>
    );
  }
}
