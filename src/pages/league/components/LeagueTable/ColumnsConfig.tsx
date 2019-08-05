import React from 'react';
import Image, { ImgStore } from '@/components/atoms/Image';
import moment from 'moment';
import * as DataType from '@/common/interfaces/dataType';
import { ColumnProps } from 'antd/lib/table';
import { EnumToText, LeagueStatusEnum } from '@/common/enums';
import MusicBar from '@/components/atoms/MusicBar';
import styles from './styles.less';

const dateFormat = 'YYYY-MM-DD';

export const Columns: ColumnProps<DataType.LeagueDetailInfo>[] = [
  {
    title: '',
    dataIndex: 'logo',
    key: 'logo',
    width: 200,
    render: (text, record) => <Image src={record.img_urls.img_list_logo} width={200} height={100} />
  },
  {
    title: '联赛',
    dataIndex: 'name',
    key: 'name',
    width: 240
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    width: 200,
    render: (text, record) => (
      <span>{`${moment.unix(record.start_time).format(dateFormat)}-${moment
        .unix(record.end_time)
        .format(dateFormat)}`}</span>
    )
  },
  {
    title: '举办地',
    dataIndex: 'match_city',
    key: 'match_city',
    width: 200
  },
  {
    title: '队伍',
    dataIndex: 'team_nums',
    key: 'team_nums',
    width: 200
  },
  {
    title: '级别',
    dataIndex: 'tier',
    key: 'tier',
    width: 200
  },
  {
    title: <Image src={ImgStore.iconGold} width={20} height={20} text="奖金" />,
    dataIndex: 'prize_money',
    key: 'prize_money',
    render: (text) => <span className={styles.price}>{text}</span>
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: (text) => (
      <span className={styles[`status${text}`]}>
        {EnumToText.LeagueStatus[text as LeagueStatusEnum]}
        {text === 1 && <MusicBar color="green" className={styles.musicBar} />}
      </span>
    )
  }
];
