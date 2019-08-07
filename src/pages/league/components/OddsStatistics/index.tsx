import React from 'react';
import { connect } from 'dva';
import StatisticsContainer from '../StatisticsContainer';
import { ActionType, NAMESPACE } from '../../constant';
import { GameTypeEnum } from '@/common/enums';
import * as DataType from '@/common/interfaces/dataType';
import TabBar, { CustomTabPane } from '@/components/molecules/TabBar';
import RateHistogram from './components/RateHistogram';
import RateProgress from './components/RateProgress';
import Select, { Option } from '@/components/atoms/Select';

import styles from './styles.less';

enum TabKey {
  Win_Lost = 'Win_Lost',
  Ten_Kill = 'Ten_Kill'
}

interface IProps {
  dispatch: (action: { type: string; payload?: any }) => void;
  oddsStat: DataType.ClassifiedByGameType<{
    hot_oddsWinrate: DataType.OddsStatForHot;
    odds_winrate: DataType.OddsStatForWin[];
  }>;
}

class OddsStatistics extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.getOddsStatAccrodingToGameType = this.getOddsStatAccrodingToGameType.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE.LEAGUE}/${ActionType.get_odds_stat}`,
      payload: { type: GameTypeEnum.DOTA2 }
    });
  }

  getOddsStatAccrodingToGameType() {
    const { oddsStat } = this.props;
    return oddsStat[GameTypeEnum.DOTA2];
  }

  render() {
    const {
      odds_winrate: oddsWinRate,
      hot_oddsWinrate: hotOddsWinRate
    } = this.getOddsStatAccrodingToGameType();
    return (
      <StatisticsContainer title="指数统计" action={this.buildSelect()}>
        <TabBar defaultActiveKey={TabKey.Win_Lost}>
          <CustomTabPane key={TabKey.Win_Lost} tab="胜负" />
        </TabBar>
        <div className={styles.oddsStat}>
          <div className={styles.oddsStatItemLeft}>
            <p className={styles.title}>指数胜率</p>
            <div className={styles.histogramContainer}>
              {oddsWinRate.map((item) => (
                <RateHistogram
                  key={item.odds}
                  nums={item.nums}
                  title={item.odds}
                  rate={Math.round(item.winper)}
                  wins={item.wins}
                />
              ))}
            </div>
          </div>
          <div className={styles.oddsStatItemRight}>
            <p className={styles.title}>热门率</p>
            <div className={styles.progressContainer}>
              <RateProgress nums={hotOddsWinRate.win_nums} total={hotOddsWinRate.total_nums} />
            </div>
          </div>
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
  oddsStat: state.league.oddsStat
}))(OddsStatistics);
