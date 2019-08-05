import React from 'react';
import moment from 'moment';

import Table from '@/components/atoms/Table';
import CustomTabBar, { CustomTabPane } from '@/components/molecules/TabBar';
import { globalDispatch } from '@/utils';
import * as DataType from '@/common/interfaces/dataType';

import styles from './styles.less';

import { ActionType, MatchType } from '../../../constants';
import { predictColumns } from './ColumnsConfig';

const predictRowKey = 'id';
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '今天'];

interface IProps {
  dataSource: DataType.UpcommingMatchInfo[];
  currentDate: number;
  currentMatchType: MatchType;
}
interface IState {
  next7Days: any[];
  last7Days: any[];
}
export default class TableView extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    dataSource: []
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      next7Days: this.getNext7Days(),
      last7Days: this.getLast7Days()
    };
    this.getCurrent7Days = this.getCurrent7Days.bind(this);
    this.buildTable = this.buildTable.bind(this);
  }

  getNext7Days() {
    return Array.from({ length: 7 }, (n, index) => {
      const time = moment().add(index, 'd');
      const weekKey = index ? time.day() : 7;
      const date = time.date();
      const text = `${time.format('MM-DD')} ${week[weekKey]}`;
      return { time, weekKey, text, date };
    });
  }
  getLast7Days() {
    return Array.from({ length: 7 }, (n, index) => {
      const time = moment().add(-index, 'd');
      const weekKey = index ? time.day() : 7;
      const date = time.date();
      const text = `${time.format('MM-DD')} ${week[weekKey]}`;
      return { time, weekKey, text, date };
    });
  }

  handleTabChange(activeKey: string) {
    globalDispatch({
      type: ActionType.change_current_date_with_namespace,
      payload: activeKey
    });
  }

  getCurrent7Days() {
    const { currentMatchType } = this.props;
    const { last7Days, next7Days } = this.state;
    switch (currentMatchType) {
      case MatchType.predict:
        return next7Days;
      case MatchType.result:
        return last7Days;
    }
    return [];
  }

  render() {
    const { dataSource, currentMatchType, currentDate } = this.props;
    return (
      <div>
        <CustomTabBar
          defaultActiveKey={moment()
            .date()
            .toString()}
          onChange={this.handleTabChange}
          withTabBarBottomBorder={false}
          isTabFullTabBar={true}
          currentActiveKey={currentDate.toString()}
        >
          {this.getCurrent7Days().map((item) => (
            <CustomTabPane tab={item.text} key={item.date} />
          ))}
        </CustomTabBar>
        {this.buildTable(dataSource, currentMatchType)}
      </div>
    );
  }

  buildTable(dataSource: DataType.UpcommingMatchInfo[], currentMatchType: MatchType) {
    switch (currentMatchType) {
      case MatchType.predict:
        return (
          <Table
            columns={predictColumns}
            rowKey={predictRowKey}
            dataSource={dataSource}
            pagination={false}
            // expandRowByClick={true}
            // expandedRowRender={() => <div>yo</div>}
          />
        );
      case MatchType.result:
        return (
          <Table
            columns={predictColumns}
            rowKey={predictRowKey}
            dataSource={dataSource}
            pagination={false}
            expandRowByClick={true}
            expandedRowRender={() => <div>yo</div>}
          />
        );
    }
    return null;
  }
}
