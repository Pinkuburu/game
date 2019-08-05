import React from 'react';
import Link from 'umi/link';
import moment from 'moment';

import { ColumnProps } from 'antd/lib/table';
import * as DataType from '@/common/interfaces/dataType';
import Image, { ImgStore } from '@/components/atoms/Image';
import styles from './styles.less';

export const predictColumns: ColumnProps<DataType.UpcommingMatchInfo>[] = [
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
    dataIndex: 'team',
    key: 'team',
    render: (text, record) => (
      <div>
        <Image
          src={record.team_a_info.custom_logo}
          text={record.team_a_info.tag}
          width={30}
          height={30}
        />
        <Image
          src={record.team_b_info.custom_logo}
          text={record.team_b_info.tag}
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
                <Image src={ImgStore.live[key.split('_')[0] as 'douyu']} width={80} height={40} />
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
        <Image src={ImgStore.checkPredict} width={100} height={30} />
      </Link>
    )
  }
];
