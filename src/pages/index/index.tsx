import React from 'react';
import { connect } from 'dva';
import { ActionType } from './constant';
import { NAMESPACE } from '../../common/constant';
import * as ReturnDataType from '../../common/interfaces/returnData';

import Predict from './components/Predict';
import LiveTableView from './components/LiveTableView';
// import Temp from '../../components/toDelete/MatchPanel';
// import MatchTableView from '../../components/molecules/MatchTableView';

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
      type: ActionType.get_upcomming_list_with_namespace
    });
  }

  componentWillUnmount() {
    console.log('组件即将注销');
  }

  render() {
    // const { predict, liveList, dispatch, UCGroup, UCLeagues } = this.props;
    const { predict } = this.props;
    return (
      <div>
        <div>
          <Predict data={predict} />
        </div>
        <LiveTableView data={predict} />
        {/* <Temp /> */}
        {/* <MatchTableView data={predict} /> */}
      </div>
    );
  }
}

export default connect((state: any) => ({
  predict: state[NAMESPACE.HOME].predict,
  liveList: state[NAMESPACE.HOME].live_list,
  UCGroup: state[NAMESPACE.HOME].UCGroup,
  UCLeagues: state[NAMESPACE.HOME].UCLeagues,
  global: state[NAMESPACE.GLOBAL]
}))(Home);
