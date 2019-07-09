import React from 'react';
import { Container, TableContainer } from './Styled';
import Table from '../Table/index';
import { ColumnProps } from 'antd/lib/table';

// import classnames from 'classnames';

interface IProps {
  data: any;
}
interface resultItem {
  key: string;
  recommend_type: string;
  game_type: string;
  result: string;
  predict: string;
  game: number;
  odds: number;
}
const dataSource: resultItem[] = [
  {
    key: '1',
    recommend_type: 'sas',
    game_type: 'sss',
    result: 'asd',
    predict: 's',
    game: 5,
    odds: 2
  },
  {
    key: '2',
    recommend_type: 'sas',
    game_type: 'sss',
    result: 'asd',
    predict: 's',
    game: 5,
    odds: 2
  },
  {
    key: '3',
    recommend_type: 'sas',
    game_type: 'sss',
    result: 'asd',
    predict: 's',
    game: 5,
    odds: 2
  }
];

const columns: ColumnProps<resultItem>[] = [
  {
    title: '游戏类型',
    dataIndex: 'game_type',
    key: 'game_type',
    width: 80
  },
  {
    title: '推荐类型',
    dataIndex: 'recommend_type',
    key: 'recommend_type',
    width: 100
  },
  {
    title: '场次',
    dataIndex: 'game',
    key: 'game',
    width: 160
  },
  {
    title: '预测',
    dataIndex: 'predict',
    key: 'predict',
    width: 140
  },
  {
    title: '指数',
    dataIndex: 'odds',
    key: 'odds',
    width: 80
  },
  {
    title: '结果',
    dataIndex: 'result',
    key: 'result',
    width: 100
  }
];

class Predict extends React.Component<IProps> {
  predictOfTodayItem(
    classname: string,
    titleLabel: string,
    strongLabel: string | number,
    normalLabel: string
  ) {
    return (
      <div className={classname}>
        <p className="head">{titleLabel}</p>
        <p className="content">
          <em className="strong">{strongLabel}</em>
          <em className="normal">{normalLabel}</em>
        </p>
      </div>
    );
  }

  render() {
    // const { data } = this.props;
    // console.log(data);
    return (
      <Container>
        <div className="panel-header">
          <div className="panel-text">今日预测</div>
          {this.predictOfTodayItem('time', '场次', '2', '/3')}
          {this.predictOfTodayItem('win-rate', '胜率', '55', '%')}
          {this.predictOfTodayItem('bene-rate', '收益率', '66', '%')}
        </div>
        <TableContainer>
          <Table bordered={false} pagination={false} dataSource={dataSource} columns={columns} />
        </TableContainer>
      </Container>
    );
  }
}

export default Predict;
