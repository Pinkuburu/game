/**
 * title: 电竞鹰眼 - 首页
 */
import React from 'react';
import { connect } from 'dva';
import { ActionType } from './constants';
import { NAMESPACE } from '../../common/constants';
import * as ReturnDataType from '../../common/interfaces/returnData';
import styles from './styles.less';
import Predict from './components/Predict';
import LiveTableView from './components/LiveTableView';
import CarouselView from './components/CarouselView';
// import Yo from '../../components/toDelete/ScorePanel';
// import Temp from '../../components/toDelete/MatchPanel';
// import MatchTableView from '../../components/molecules/MatchTableView';

export interface IProps {
  dispatch: (action: any) => void;
  banners: ReturnDataType.BannersImg[];
  predict: ReturnDataType.PredictOfToday;
  liveList: [];
  UCGroup: {};
  UCLeagues: {};
}

class Home extends React.Component<IProps> {
  componentDidMount() {
    this.props.dispatch({
      type: ActionType.get_predict_with_namespace
    });
    this.props.dispatch({
      type: ActionType.get_banners_with_namespace
    });
  }

  render() {
    // const { predict, liveList, dispatch, UCGroup, UCLeagues } = this.props;
    const { predict, banners } = this.props;
    return (
      <div>
        <div className={styles.predictAndCarouselContainer}>
          <Predict list={predict.list} total={predict.total} />
          <CarouselView className={styles.carouselViewContainer} imgUrls={banners} />
        </div>
        <LiveTableView data={predict} />
        {/* <Yo /> */}
        {/* <Temp /> */}
        {/* <MatchTableView data={predict} /> */}
      </div>
    );
  }
}

export default connect((state: any) => ({
  predict: state[NAMESPACE.HOME].predict,
  banners: state[NAMESPACE.HOME].banners,
  liveList: state[NAMESPACE.HOME].live_list,
  UCGroup: state[NAMESPACE.HOME].UCGroup,
  UCLeagues: state[NAMESPACE.HOME].UCLeagues,
  global: state[NAMESPACE.GLOBAL]
}))(Home);
