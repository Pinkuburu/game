import React from 'react';
import { Typography } from 'antd';

import TableView from './../Common/TableView';
import LoadingIcon from '../Common/LoadingIcon';
import { imgStore } from '../../utils/imgStore';
import { StyleLiveContainer, MusicBar } from './Styled';

class LiveContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  flashData() {

  }

  render() {
    const { live_list } = this.props;

    return (
      <StyleLiveContainer>
        <div className="live-icon d-flex justify-content-between align-items-center">
          <div className="f f-ai-c">
            <MusicBar>
              <span className="bar n1">A</span>
              <span className="bar n2">B</span>
              <span className="bar n3">c</span>
              <span className="bar n4">D</span>
              <span className="bar n5">E</span>
            </MusicBar>
            <span className="font_main m-r-30 n-wrap">
              数据直播
            </span>
            <LoadingIcon flashData={() => this.flashData()} />
          </div>
          <div className="select-game f f-ai-c">
            <img src={imgStore.dota2} alt="dota2" className="cur-p" />
            <img src={imgStore.lol} alt="lol" className="cur-p" />
            <img src={imgStore.csgo} alt="csgo" className="cur-p" />
          </div>
        </div>
        <div className="live-table">
          
          {/* <TableView />
          <TableView />
          <TableView /> */}
        </div>
      </StyleLiveContainer>
    );
  }
}

export default LiveContainer;
