import React from 'react';
import styles from './styles.less';
import Image from '../../Image/index';
import ImageStore from '../../Image/imgStore';
const TableNoData: React.FC = () => (
  <div className={styles.tableNoData}>
    <Image
      width={40}
      height={40}
      src={ImageStore.noDataIcon}
      text="暂无数据"
      textClassName={styles.text}
      spacing={9}
    />
  </div>
);
export default TableNoData;
