import React from 'react';
import { connect } from 'dva';
import Table from '@/components/atoms/Table';
import { GameTypeEnum } from '@/common/enums';
import * as DataType from '@/common/interfaces/dataType';
import { ActionType, NAMESPACE } from '../../constant';
import { Columns } from './ColumnsConfig';
import StatisticsContainer from '../StatisticsContainer';
import Select, { Option } from '@/components/atoms/Select';
import styles from './styles.less';

interface IProps {
  dispatch: (action: { type: string; payload?: any }) => void;
  heroStat: DataType.ClassifiedByGameType<any>;
}

class HeroStatistics extends React.PureComponent<IProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE.LEAGUE}/${ActionType.get_hero_stat}`,
      payload: { type: GameTypeEnum.DOTA2 }
    });
  }

  render() {
    const { heroStat } = this.props;
    return (
      <StatisticsContainer title="英雄统计" action={this.buildSelect()}>
        <div className={styles.heroStatContainer}>
          {Array.from({ length: 5 }).map((item, index) => (
            <div key={index}>
              <div>{`${index + 1}号位`}</div>
              <Table
                dataSource={heroStat[GameTypeEnum.DOTA2][`place_${index + 1}`]}
                rowKey="hero_id"
                pagination={false}
                columns={Columns}
              />
            </div>
          ))}
        </div>
      </StatisticsContainer>
    );
  }
  buildSelect() {
    return (
      <Select defaultValue="months" style={{ width: 130, height: 30 }}>
        <Option value="months">最近一个月</Option>
        <Option value="months1">最近一个月</Option>
        <Option value="months2">最近一个月</Option>
        <Option value="months3">最近一个月</Option>
      </Select>
    );
  }
}

interface ConnectState {
  league: any;
}

export default connect((state: ConnectState) => ({
  heroStat: state.league.heroStat
}))(HeroStatistics);