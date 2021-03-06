import React from 'react';
import Image from '@/components/atoms/Image';
// import moment from 'moment';
import * as DataType from '@/common/interfaces/dataType';
import { ColumnProps } from '../CustomTable/index.d';
import styles from './styles.less';

function getRate(num: number, total: number) {
  if (total === 0 || num === 0) {
    return 0;
  }
  return `${Math.round((num / total) * 100)}%`;
}

export const Columns: ColumnProps<DataType.HeroStat>[] = [
  {
    title: '英雄',
    dataIndex: 'name.name_cn',
    key: 'name',
    width: 140,
    render: (text, record, index) => (
      <Image src={record.name.img} width={30} height={30} text={text} className={styles.heroInfo} />
    ),
    align: 'left',
    headerAlign: 'center'
  },
  {
    title: '出场',
    dataIndex: 'nums',
    key: 'nums'
    // width: 60
    // sorter: (a, b) => a.nums - b.nums
  },
  {
    title: '胜率',
    dataIndex: 'win_rate',
    key: 'win_rate',
    width: 60,
    render: (text, record) => <span>{getRate(record.wins, record.nums)}</span>
  },
  {
    title: '碾压率',
    dataIndex: 'stomp_rate',
    key: 'stomp_rate',
    width: 60,

    render: (text, record) => <span>{getRate(record.stomp_wins, record.stomp_nums)}</span>
  },
  {
    title: '翻盘率',
    dataIndex: 'reverse_rate',
    key: 'reverse_rate',
    width: 60,
    render: (text, record) => <span>{getRate(record.reverse_wins, record.reverse_nums)}</span>
  }
];
