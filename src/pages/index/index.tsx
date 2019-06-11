import React from 'react';
import { connect } from 'dva';

import Predict from '../../component/Home/Predict';
import LiveContainer from '../../component/Home/LiveContainer';
import MatchPanel from '../../component/Home/MatchPanel';

export interface HomeProps {
  banners: [];
  predict: object;
  dispatch: (action: object) => void;
  liveList: [];
  upcommingList: [];
}

class Home extends React.Component<HomeProps> {
  componentDidMount() {
    
  }
  render() {
    const { predict, liveList, dispatch, upcommingList } = this.props;
    return (
      <div>
        <div>
          <Predict data={predict} />
        </div>
        <LiveContainer
          live_list={liveList}
          refresh={() => dispatch({ type: 'getLiveList' })}
        />
        <MatchPanel upcommingList={upcommingList} />
      </div>
    );
  }
}
 
export default connect((state: any) => {
  return {
    banners: state.model.banners,
    predict: state.model.predict,
    liveList: state.model.live_list,
    upcommingList: state.model.upcommingList,
  };
})(Home);
