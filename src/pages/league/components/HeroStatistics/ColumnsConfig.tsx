// import React from 'react';
// import Image from '@/components/atoms/Image';
// import moment from 'moment';
import * as DataType from '@/common/interfaces/dataType';
import { ColumnProps } from 'antd/lib/table';

export const Columns: ColumnProps<DataType.HeroStat>[] = [
  {
    title: '英雄',
    dataIndex: 'name.name_cn',
    key: 'name'
  },
  {
    title: '出场',
    dataIndex: 'nums',
    key: 'nums',
    sorter: (a, b) => a.nums - b.nums
  },
  {
    title: '胜率',
    dataIndex: 'stomp_wins',
    key: 'stomp_wins'
  },
  {
    title: '碾压率',
    dataIndex: 'stomp_lost',
    key: 'stomp_lost'
  },
  {
    title: '翻盘率',
    dataIndex: 'stomp_nums',
    key: 'stomp_nums'
  }
];
