import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import CarouselList from '@/components/molecules/CarouselList';
import * as DataType from '@/common/interfaces/dataType';
import ScoreCell from './ScoreCell';
import memoizeOne from 'memoize-one';
import classnames from 'classnames';
import styles from './styles.less';

interface IProps {
  currentZoneId: string;
  schedulesGroupByDate: {
    [propsName: string]: {
      [propsName: string]: DataType.ScheduleResult[];
    };
  };
}

interface IState {
  currentDate: string;
}

class Schedules extends React.PureComponent<IProps, IState> {
  sortedDate = memoizeOne((arr: any[]) => arr.sort(), _.isEqual);
  getDefaultDate = memoizeOne((arr: any[]) => arr[0], _.isEqual);
  constructor(props: IProps) {
    super(props);
    this.handleDateItemClick = this.handleDateItemClick.bind(this);
    this.state = {
      currentDate: ''
    };
  }

  handleDateItemClick(date: string) {
    const { currentDate } = this.state;
    if (currentDate === date) return;
    this.setState({ currentDate: date });
  }

  componentDidUpdate(prevProps: IProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentZoneId !== prevProps.currentZoneId) {
      console.log('这里要重置currentKey,应该只有在currentZoneId改变时触发');
      // eslint-disable-next-line
      this.setState({ currentDate: '' });
    }
  }

  render() {
    const { currentZoneId, schedulesGroupByDate } = this.props;
    const { currentDate } = this.state;
    const currentSchedules = schedulesGroupByDate[currentZoneId] || [];
    const dateArr = this.sortedDate(Object.keys(currentSchedules));
    const defaultDate = this.getDefaultDate(dateArr);
    return (
      <div className={styles.schedulesContainer}>
        <div className={styles.dateContainer}>
          <CarouselList itemWidth={113} spacing={10} key={currentZoneId}>
            {dateArr.map((item) => (
              <div
                key={item}
                className={classnames(styles.dateItem, {
                  [styles.active]: item === (currentDate || defaultDate)
                })}
                onClick={this.handleDateItemClick.bind(this, item)}
              >
                {item}
              </div>
            ))}
          </CarouselList>
        </div>
        <div className={styles.itemContainer}>
          <CarouselList itemWidth={260} arrowSize="big" key={currentDate}>
            {(currentSchedules[currentDate || defaultDate] || []).map(
              (item: DataType.ScheduleResult) => (
                <ScoreCell key={item.id} item={item} />
              )
            )}
          </CarouselList>
        </div>
      </div>
    );
  }
}
interface ConnectState {
  leagueDetails: any;
}

export default connect((state: ConnectState) => ({
  currentZoneId: state.leagueDetails.currentZoneId,
  schedulesGroupByDate: state.leagueDetails.schedulesGroupByDate
}))(Schedules);
