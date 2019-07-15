import React from 'react';
import styles from './index.less';
import RefreshIcon from '../../../../components/atoms/RefreshIcon';
import Table from '../../../../components/atoms/Table';
import { imgStore } from '../../../../utils/imgStore';
import classnames from 'classnames';

interface IProps {
  data: any;
}

class LiveTableView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  flashData() {}
  render() {
    return (
      <div className={styles.container}>
        <div className="live-icon d-flex justify-content-between align-items-center">
          <div className="f f-ai-c">
            ß
            <span className={styles.musicBar}>
              <span className="bar n1">A</span>
              <span className="bar n2">B</span>
              <span className="bar n3">c</span>
              <span className="bar n4">D</span>
              <span className="bar n5">E</span>
            </span>
            <span className="font_main m-r-30 n-wrap">数据直播</span>
            <RefreshIcon onRefresh={() => 1} />
          </div>
          <div className={classnames(styles['select-game'], 'f f-ai-c')}>
            <img src={imgStore.dota2} alt="dota2" className="cur-p" />
            <img src={imgStore.lol} alt="lol" className="cur-p" />
            <img src={imgStore.csgo} alt="csgo" className="cur-p" />
          </div>
        </div>
        <Table />
      </div>
    );
  }
}

export default LiveTableView;
