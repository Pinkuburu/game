import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import _ from 'lodash';
// import Image from '../../component/Image';
import panelBg from '../../assets/bg_jryc.svg';
import constants from '../../constant';
import { percent } from '../../utils';

const Panel = styled.div`
  width: 700px;
  .panel-header {
    display: flex;
    height: 70px;
    background: url(${panelBg}) no-repeat center / cover;
    padding-top: 10px;
    text-align: center;
    color: ${constants.hover_font};
    .panel-text {
      flex: 1 1 200px;
      font-size: 30px;
    }
    .time {
      flex: 1 1 160px;
    }
    .win-rate {
      flex: 1 1 140px;
    }
    .bene-rate {
      flex: 1 1 200px;
    }
  }
  .wrapper {
    padding: 0 20px 25px 20px;
    > tr > th {
      word-wrap: break-word;
      word-break: break-all;
    }
    th.p_table_cell {
      text-align: center;
      padding: 0;
      line-height: 30px;
      color: ${constants.nav_font};
      background: ${constants.card_header};
    }
    tr {
      &:nth-child(odd) {
        background: ${constants.item_first};
      }
      &:nth-child(even) {
        background: ${constants.item_second};
      }
    }
    td.p_table_cell {
      height: 50px;
      color: ${constants.main_font};
    }
  }
`;

const cols = [
  {
    title: '游戏类型',
    key: ['game_type', 'best_of'],
    width: 80,
    className: 'p_table_cell',
    render() {
      // const info = _(data);
      // const type = info.get(0, 1);
      // const bo = info.get(1, '2');
      // return (
      //   <div className="text-center" style={{ lineHeight: '50px' }}>
      //     <Image

      //     />
      //     <span>BO{bo}</span>
      //   </div>
      // );
    }
  },
  {
    title: '推荐类型',
    key: 'recommend_type',
    width: 100,
    className: 'p_table_cell',
    render(data: number) {
      const type = ['未知', '赛前', '实时'];
      return type[data];
    }
  },
  {
    title: '场次',
    key: [
      'team_a_info.tag',
      'team_a_info.custom_logo',
      'team_b_info.tag',
      'team_b_info.custom_logo'
    ],
    width: 160,
    className: 'p_table_cell',
    render() {
      return '哈哈';
      // const info = _(data);
      // const at = info.get(0);
      // const ac = info.get(1);
      // const bt = info.get(2);
      // const bc = info.get(3);
      // return (
      //   <div className="b-info text-ell">
      //     <div className="img-text-center" style={{ lineHeight: '25px' }}>
      //       <Image object="cover" height={25} width={25} type="dota2Cir" src={ac} />
      //       &nbsp; &nbsp;
      //       {at}
      //     </div>
      //     <div className="img-text-center" style={{ lineHeight: '25px' }}>
      //       <Image object="cover" height={25} width={25} type="dota2Cir" src={bc} />
      //       &nbsp; &nbsp;
      //       {bt}
      //     </div>
      //   </div>
      // );
    }
  },
  {
    title: '预测',
    key: ['content', 'is_member'],
    width: 140,
    className: 'p_table_cell',
    render() {
      // if (!data || data === '--') return '--';
      return '预测';
      // const [result, isMember] = data;
      // const [team, type] = result.split(' ');
      // if (!isMember) {
      //   return (
      //     <div
      //       style={{
      //         height: '30px',
      //         background: `center / contain url(${checkPredict}) no-repeat`,
      //       }}
      //     />
      //   );
      // } else if (type === '胜') {
      //   return <div className="result-win text-ell">{team}</div>;
      // } else {
      //   return (
      //     <div>
      //       {type}&nbsp;{team}
      //     </div>
      //   );
      // }
    }
  },
  {
    title: '指数',
    key: 'odds',
    width: 80,
    className: 'p_table_cell'
  },
  {
    title: '结果',
    key: 'result',
    width: 100,
    className: 'p_table_cell',
    render(res) {
      return res;
      // if (res === '正确') {
      //   return <img src={correctMap[0]} alt="" />;
      // } else if (res === '错误') {
      //   return <img src={correctMap[1]} alt="" />;
      // } else {
      //   return '--';
      // }
    }
  }
];

interface PredictProps {
  data: {
    total: { [propNames: string]: any };
    list: [];
  },
}

// eslint-disable-next-line react/prop-types
const Predict: React.SFC<PredictProps> = ({ data }) => {
  // const { total, list } = data;
  // eslint-disable-next-line react/prop-types
  const total = _.defaultsDeep(data.total, {
    success_scene: 0,
    total_scene: 0,
    win_rate: 0,
    rate_of_return: 0
  });
  const list = _.get(data, 'list', [
    {
      game_type: 1,
      best_of: 2,
      recommend_type: 1,
      team_a_info: {
        tag: null,
        custom_logo: null
      },
      team_b_info: {
        tag: null,
        custom_logo: null
      },
      content: {},
      odds: 0,
      result: '正确'
    }
  ]);
  return (
    <Panel>
      <div className="panel-header">
        <div className="panel-text">今日预测</div>
        <div className="time">
          <p className="head">场次</p>
          <p className="content">
            <span className="strong">{total.success_scene}</span>/{total.total_scene}
          </p>
        </div>
        <div className="win-rate">
          <span className="head">胜率</span>
          <p className="content">
            <span className="strong">{percent(total.win_rate)}</span>%
          </p>
        </div>
        <div className="bene-rate">
          <span className="head">收益率</span>
          <p>
            <span className="strong">{percent(total.rate_of_return)}</span>%
          </p>
        </div>
      </div>
      <div className="wrapper">
        <Table bordered={false} pagination={false} dataSource={list} columns={cols} />
      </div>
    </Panel>
  );
};


export default Predict;
