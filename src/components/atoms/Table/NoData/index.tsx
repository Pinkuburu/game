import React from 'react';
import styles from './styles.less';
import Image from '../../Image/index';
import ImageStore from '../../Image/imgStore';
const TableNoData: React.FC = () => (
  <div className={styles.tableNoData}>
    <Image width={40} height={40} src={ImageStore.noDataIcon} />
    <span>暂无数据</span>
  </div>
);
export default TableNoData;
