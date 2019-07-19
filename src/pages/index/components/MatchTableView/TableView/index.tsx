import React from 'react';
import { Tabs } from 'antd';
import Link from 'umi/link';
import moment from 'moment';

import Table from '../../../../../components/atoms/Table';
import DateTabBar from '../../../../../components/molecules/TabBar/DateTabBar';
import Image from '../../../../../components/atoms/Image';
import * as DataType from '../../../../../common/interfaces/dataType';

import styles from './styles.less';
import { ColumnProps } from 'antd/lib/table';
import ImageStore from '../../../../../components/atoms/Image/imgStore';
const { TabPane } = Tabs;

const predictRowKey = 'match_id';
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '今天'];

const predictColumns: ColumnProps<DataType.UpcommingMatchInfo>[] = [
  {
    title: '联赛/赛制',
    dataIndex: 'best_of',
    key: 'best_of',
    fixed: 'left',
    width: 100,
    render: (text, record) => (
      <div className={styles.rowHeight}>
        <Image
          src={record.league_img_url}
          text={`BO${text}`}
          title={record.league_name}
          textPostion="bottom"
          width={38}
          height={38}
        />
      </div>
    )
  },
  {
    title: '时间',
    dataIndex: 'start_time',
    key: 'start_time',
    width: 100,
    render: (text) => moment.unix(text).format('HH:mm')
  },
  {
    title: '队伍',
    width: 160,
    dataIndex: 'opponents',
    key: 'opponents',
    render: (text, record) => (
      <div>
        <Image
          src={record.opponents.team_a_info.custom_logo}
          text={record.opponents.team_a_info.tag}
          width={30}
          height={30}
        />
        <Image
          src={record.opponents.team_b_info.custom_logo}
          text={record.opponents.team_b_info.tag}
          width={30}
          height={30}
        />
      </div>
    )
  },
  // {
  //   title: '鹰眼指数',
  //   width: 100,
  //   dataIndex: 'odds',
  //   key: 'eyes'
  // },
  {
    title: 'GG.BET',
    width: 140,
    children: [
      {
        title: '初始',
        dataIndex: 'odds[0].gg_bet',
        key: 'gg_bet_0'
      },
      {
        title: '即时',
        dataIndex: 'odds[1].gg_bet',
        key: 'gg_bet_1'
      }
    ]
  },
  {
    title: '沙巴',
    width: 140,
    children: [
      {
        title: '初始',
        dataIndex: 'odds[0].sb',
        key: 'sb_0'
      },
      {
        title: '即时',
        dataIndex: 'odds[1].sb',
        key: 'sb_1'
      }
    ]
  },
  {
    title: '雷竞技',
    children: [
      {
        width: 70,
        title: '初始',
        dataIndex: 'odds[0].ljj',
        key: 'ljj_0'
      },
      {
        title: '即时',
        width: 70,
        dataIndex: 'odds[1].ljj',
        key: 'ljj_1'
      }
    ]
  },
  {
    // width: 300,
    title: '直播信号',
    dataIndex: 'live_url',
    key: 'live_url',
    render: (text, record) => (
      <div className={styles.liveLinkContainer}>
        {Object.entries(record.live_url).map(
          ([key, value]) =>
            value && (
              <a href={value} key={key} target="_blank" rel="noreferrer noopener">
                <Image src={ImageStore.live[key.split('_')[0]]} width={80} height={40} />
              </a>
            )
        )}
      </div>
    )
  },
  {
    title: '预测',
    dataIndex: 'winner_id',
    key: 'winner_id',
    width: 100,
    // fixed: 'right',
    render: () => (
      <Link to="/predict">
        <Image src={ImageStore.checkPredict} width={100} height={30} />
      </Link>
    )
  }
];
interface IProps {
  dataSource: DataType.UpcommingMatchInfo[];
}
interface IState {
  next7Days: any[];
  last7Days: any[];
}
export default class TableView extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      next7Days: this.getNext7Days(),
      last7Days: this.getLast7Days()
    };
  }
  static defaultProps = {
    dataSource: []
  };

  // 屏幕尺寸变化时Tab下方的活动条不会变(没有render)
  getNext7Days() {
    return Array.from({ length: 7 }, (n, index) => {
      const time = moment().add(index, 'd');
      const weekKey = index ? time.day() : 7;
      const text = `${time.format('MM-DD')} ${week[weekKey]}`;
      return { time, weekKey, text };
    });
  }
  getLast7Days() {
    return Array.from({ length: 7 }, (n, index) => {
      const time = moment().add(-index, 'd');
      const weekKey = index ? time.day() : 7;
      const text = `${time.format('MM-DD')} ${week[weekKey]}`;
      return { time, weekKey, text };
    });
  }

  render() {
    const { next7Days } = this.state;
    const { dataSource } = this.props;
    console.dir(dataSource);
    return (
      <div>
        <DateTabBar defaultActiveKey={'7'}>
          {next7Days.map((item) => (
            <TabPane tab={item.text} key={item.weekKey} />
          ))}
        </DateTabBar>
        <Table
          columns={predictColumns}
          rowKey={predictRowKey}
          dataSource={dataSource}
          pagination={false}
          // expandRowByClick={true}
          // expandedRowRender={() => <div>yo</div>}
        />
      </div>
    );
  }
}
