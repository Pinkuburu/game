import React from 'react';
import { connect } from 'dva';
import { ActionType } from './constant';
import * as ReturnDataType from '../../common/interfaces/returnData';

// import Predict from '../../component/Home/Predict';
// import LiveContainer from '../../components/Home/LiveContainer';
// import MatchPanel from '../../components/Home/MatchPanel';
import Predict from '../../components/molecules/Predict';
import LiveTableView from '../../components/molecules/LiveTableView';
import MatchTableView from '../../components/molecules/MatchTableView';
export interface IProps {
  dispatch: (action: any) => void;
  banners: [];
  predict: ReturnDataType.PredictOfToday;
  liveList: [];
  UCGroup: {};
  UCLeagues: {};
}

class Home extends React.Component<IProps> {
  componentDidMount() {
    this.props.dispatch({
      type: `home/${ActionType.get_predict}`
    });
  }

  render() {
    // const { predict, liveList, dispatch, UCGroup, UCLeagues } = this.props;
    const { predict } = this.props;
    return (
      <div>
        <div>
          <Predict data={predict} />
        </div>
        {/* <LiveContainer live_list={liveList} refresh={() => dispatch({ type: 'getLiveList' })} /> */}
        <LiveTableView data={predict} />
        {/* <MatchPanel UCGroup={UCGroup} UCLeagues={UCLeagues} /> */}
        <MatchTableView data={predict} />
      </div>
    );
  }
}

export default connect((state: any) => ({
  home: state.home,
  predict: state.home.predict,
  liveList: state.home.live_list,
  UCGroup: state.home.UCGroup,
  UCLeagues: state.home.UCLeagues,
  global: state.global
}))(Home);
