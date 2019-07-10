import React from 'react';
// import { ColumnProps } from 'antd/lib/table';
import styles from './index.less';
import LoadingIcon from '../../Common/LoadingIcon';
import { imgStore } from '../../../utils/imgStore';
import classnames from 'classnames';
// import Table from '../../atoms/Table/index';

interface IProps {
  data: any;
}
// interface resultItem {
//   key: string;
//   recommend_type: string;
//   game_type: string;
//   result: string;
//   predict: string;
//   game: number;
//   odds: number;
// }
// const dataSource: resultItem[] = [
//   {
//     key: '1',
//     recommend_type: 'sas',
//     game_type: 'sss',
//     result: 'asd',
//     predict: 's',
//     game: 5,
//     odds: 2
//   },
//   {
//     key: '2',
//     recommend_type: 'sas',
//     game_type: 'sss',
//     result: 'asd',
//     predict: 's',
//     game: 5,
//     odds: 2
//   },
//   {
//     key: '3',
//     recommend_type: 'sas',
//     game_type: 'sss',
//     result: 'asd',
//     predict: 's',
//     game: 5,
//     odds: 2
//   }
// ];

// const columns: ColumnProps<resultItem>[] = [
//   {
//     title: '游戏类型',
//     dataIndex: 'game_type',
//     key: 'game_type',
//     width: 80
//   },
//   {
//     title: '推荐类型',
//     dataIndex: 'recommend_type',
//     key: 'recommend_type',
//     width: 100
//   },
//   {
//     title: '场次',
//     dataIndex: 'game',
//     key: 'game',
//     width: 160
//   },
//   {
//     title: '预测',
//     dataIndex: 'predict',
//     key: 'predict',
//     width: 140
//   },
//   {
//     title: '指数',
//     dataIndex: 'odds',
//     key: 'odds',
//     width: 80
//   },
//   {
//     title: '结果',
//     dataIndex: 'result',
//     key: 'result',
//     width: 100
//   }
// ];

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
            <span className={styles.musicBar}>
              <span className="bar n1">A</span>
              <span className="bar n2">B</span>
              <span className="bar n3">c</span>
              <span className="bar n4">D</span>
              <span className="bar n5">E</span>
            </span>
            <span className="font_main m-r-30 n-wrap">数据直播</span>
            <LoadingIcon flashData={() => this.flashData()} />
          </div>
          <div className={classnames(styles['select-game'], 'f f-ai-c')}>
            <img src={imgStore.dota2} alt="dota2" className="cur-p" />
            <img src={imgStore.lol} alt="lol" className="cur-p" />
            <img src={imgStore.csgo} alt="csgo" className="cur-p" />
          </div>
        </div>
        <div className="live-table" />
      </div>
    );
  }
}

export default LiveTableView;
