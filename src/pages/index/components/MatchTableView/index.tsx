import React from 'react';
// import { ColumnProps } from 'antd/lib/table';
import styles from './styles.less';
import RefreshIcon from '../../../../components/atoms/RefreshIcon';
import { CirGameIcon } from '../../../../components/atoms/Image/imgStore';
import classnames from 'classnames';
// import Table from '../../atoms/Table/index';

interface IProps {
  data: any;
}

class MatchTable extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  flashData() {
    console.log('2');
  }
  render() {
    return (
      <div className={styles.container}>
        <div className="live-icon d-flex justify-content-between align-items-center">
          <div className="f f-ai-c">
            <span className={styles.musicBar}>
              <span className="bar n1">A</span>
              <span className="bar n2">B</span>
              <span className="bar n3">c</span>
              <span className="bar n4">D</span>
              <span className="bar n5">E</span>
            </span>
            <span className="font_main m-r-30 n-wrap">数据直播</span>
            <RefreshIcon onRefresh={this.flashData} />
          </div>
          <div className={classnames(styles['select-game'], 'f f-ai-c')}>
            <img src={CirGameIcon.dota2} alt="dota2" className="cur-p" />
            <img src={CirGameIcon.lol} alt="lol" className="cur-p" />
            <img src={CirGameIcon.csgo} alt="csgo" className="cur-p" />
          </div>
        </div>
        <div className="live-table" />
      </div>
    );
  }
}

export default MatchTable;
