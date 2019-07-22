/**
 * title: 电竞鹰眼 - 首页
 */
import React from 'react';
import { connect } from 'dva';
import { ActionType, GameType, MatchType } from './constants';
import * as DataType from '../../common/interfaces/dataType';
import styles from './styles.less';
import Predict from './components/PredictView';
import LiveTableView from './components/LiveTableView';
import CarouselView from './components/CarouselView';
import MatchTableView from './components/MatchTableView';

export interface IProps {
  dispatch: (action: any) => void;
  banners: DataType.BannersImg[];
  predict: DataType.PredictOfToday;
  liveList: [];
  currentGameType: GameType[];
  currentSelectedLeaguesId: number[];
  currentMatchType: MatchType;
  currentDate: number;
  leagueList: [];
  matchList: [];
  matchTableViewGameType: number;
}

class Home extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.refreshLiveTableData = this.refreshLiveTableData.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({
      type: ActionType.get_predict_with_namespace
    });
    this.props.dispatch({
      type: ActionType.get_banners_with_namespace
    });
    this.props.dispatch({
      type: ActionType.get_live_list_with_namespace
    });
    this.props.dispatch({
      type: ActionType.get_upcomming_list_with_namespace
    });
  }

  refreshLiveTableData() {}

  render() {
    const {
      predict,
      banners,
      matchTableViewGameType,
      leagueList,
      matchList,
      currentDate,
      currentGameType,
      currentMatchType,
      currentSelectedLeaguesId
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.predictAndCarouselContainer}>
          <Predict list={predict.list} total={predict.total} />
          <CarouselView className={styles.carouselViewContainer} imgUrls={banners} />
        </div>
        <LiveTableView onRefreshData={this.refreshLiveTableData} />
        <MatchTableView
          currentGameType={currentGameType}
          currentMatchType={currentMatchType}
          currentSelectedLeaguesId={currentSelectedLeaguesId}
          currentDate={currentDate}
          gameType={matchTableViewGameType}
          leagueList={leagueList}
          matchList={matchList}
        />
      </div>
    );
  }
}

// 当前页面用到的moel写在这
interface ConnectState {
  home: any;
  match: any;
  global: any;
}

export default connect((state: ConnectState) => ({
  predict: state.home.predict,
  banners: state.home.banners,
  liveList: state.home.live_list,
  dataForMatchTable: state.match.dataForMatchTable,
  currentLeagueList: state.match.dataForSelectedLeagues[state.match.currentGameType[0]],
  matchTableViewGameType: state.match.gameType,
  currentDate: state.match.currentDate[state.match.currentMatchType],
  currentGameType: state.match.currentGameType,
  currentMatchType: state.match.currentMatchType,
  currentSelectedLeaguesId: state.match.currentSelectedLeaguesId,
  leagueList: state.match.currentGameType
    .map((gameType: GameType) => state.match.dataForSelectedLeagues[gameType])
    .flat(),
  matchList: state.match.currentSelectedLeaguesId
    .map((leagueId: number) => {
      const {
        match: { dataForMatchTable, currentDate, currentMatchType }
      } = state;
      return dataForMatchTable[leagueId][currentDate[currentMatchType]] || [];
    })
    .flat(),
  global: state.global
}))(Home);
