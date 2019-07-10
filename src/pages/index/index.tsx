import React from 'react';
import { connect } from 'dva';

// import Predict from '../../component/Home/Predict';
import LiveContainer from '../../components/Home/LiveContainer';
import MatchPanel from '../../components/Home/MatchPanel';
import Predict1 from '../../components/Predict';

export interface HomeProps {
  banners: [];
  predict: {};
  dispatch: (action: any) => void;
  liveList: [];
  UCGroup: {};
  UCLeagues: {};
}

class Home extends React.Component<HomeProps> {
  render() {
    const { predict, liveList, dispatch, UCGroup, UCLeagues } = this.props;
    return (
      <div>
        {/* <div>
          <Predict data={predict} />
        </div> */}
        <div>
          <Predict1 data={predict} />
        </div>
        <LiveContainer live_list={liveList} refresh={() => dispatch({ type: 'getLiveList' })} />
        <MatchPanel UCGroup={UCGroup} UCLeagues={UCLeagues} />
      </div>
    );
  }
}

export default connect((state: any) => ({
  banners: state.model.banners,
  predict: state.model.predict,
  liveList: state.model.live_list,
  UCGroup: state.model.UCGroup,
  UCLeagues: state.model.UCLeagues
}))(Home);
