/**
 * title: 电竞鹰眼 - 首页
 */
import React from 'react';
import { connect } from 'dva';
import { ActionType } from './constants';
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
  UCGroup: {
    dota2: any;
    lol: any;
    csgo: any;
  };
  UCLeagues: {
    dota2: [];
    lol: [];
    csgo: [];
  };
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
    // const { predict, liveList, dispatch, UCGroup, UCLeagues } = this.props;
    const { predict, banners, matchTableViewGameType, UCLeagues, UCGroup } = this.props;
    return (
      <div>
        <div className={styles.predictAndCarouselContainer}>
          <Predict list={predict.list} total={predict.total} />
          <CarouselView className={styles.carouselViewContainer} imgUrls={banners} />
        </div>
        <LiveTableView onRefreshData={this.refreshLiveTableData} />
        <MatchTableView
          gameType={matchTableViewGameType}
          leagueList={UCLeagues.dota2}
          matchList={UCGroup.lol[294]}
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
  UCGroup: state.match.UCGroup,
  UCLeagues: state.match.UCLeagues,
  matchTableViewGameType: state.match.gameType,
  global: state.global
}))(Home);
