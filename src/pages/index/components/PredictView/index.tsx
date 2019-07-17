import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import styles from './styles.less';
import Table from '../../../../components/atoms/Table/index';
import * as ReturnDataType from '../../../../common/interfaces/returnData';
import PropTypes from 'prop-types';
// import GameTypeCell from './components/GameTypeCell';
// import GameCell from './components/GameCell';
// import ResultCell from './components/ResultCell';
// import OddsCell from './components/OddsCell';
// import PredictCell from './components/PredictCell';
// import RecommendTypeCell from './components/RecommendTypeCell';

interface IProps extends ReturnDataType.PredictOfToday {}

const columns: ColumnProps<ReturnDataType.PredictResult>[] = [
  {
    title: '游戏类型',
    dataIndex: 'game_type',
    key: 'game_type',
    width: 80
    // render: () => <GameTypeCell />π
  },
  {
    title: '推荐类型',
    dataIndex: 'recommend_type',
    key: 'recommend_type',
    width: 100
    // render: () => <RecommendTypeCell />
  },
  {
    title: '场次',
    dataIndex: 'game',
    key: 'game',
    width: 160
    // render: () => <GameCell />
  },
  {
    title: '预测',
    dataIndex: 'predict',
    key: 'predict',
    width: 140
    // render: () => <PredictCell />
  },
  {
    title: '指数',
    dataIndex: 'odds',
    key: 'odds',
    width: 80
    // render: () => <OddsCell />
  },
  {
    title: '结果',
    dataIndex: 'result',
    key: 'result',
    width: 100
    // render: () => <ResultCell />
  }
];

class PredictView extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.buildPredictOfTodayItem = this.buildPredictOfTodayItem.bind(this);
  }
  // 设置默认值
  static defaultProps = {
    list: [],
    total: {
      finish_match: 0,
      total_scene: 0,
      win_rate: 1,
      rate_of_return: 0
    }
  };

  // 类型检查
  static propTypes = {
    total: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired
  };

  buildPredictOfTodayItem(
    classname: string,
    titleLabel: string,
    strongLabel: string | number,
    normalLabel: string
  ) {
    return (
      <div className={styles[classname]}>
        <p className={styles.head}>{titleLabel}</p>
        <p className={styles.content}>
          <em className={styles.strong}>{strongLabel}</em>
          <em className={styles.normal}>{normalLabel}</em>
        </p>
      </div>
    );
  }

  render() {
    // 可以在这里转化名称
    const {
      list,
      total: {
        finish_match: finishMatch,
        total_scene: totalScene,
        win_rate: winRate,
        rate_of_return: rateOfReturn
      }
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.panelHeader}>
          <div className={styles.panelText}>今日预测</div>
          {this.buildPredictOfTodayItem('time', '场次', finishMatch, `/${totalScene}`)}
          {this.buildPredictOfTodayItem('winRate', '胜率', winRate, '%')}
          {this.buildPredictOfTodayItem('beneRate', '收益率', rateOfReturn, '%')}
        </div>
        <div className={styles.tableContainer}>
          <Table
            bordered={false}
            pagination={false}
            dataSource={list}
            columns={columns}
            rowKey="id"
          />
        </div>
      </div>
    );
  }
}

export default PredictView;
