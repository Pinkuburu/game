import React from 'react';
import styles from './styles.less';
import Image, { ImgStore } from '@/components/atoms/Image';

interface IProps {}

// TODO: 修改Empty效果
export default class TableEmpty extends React.PureComponent<IProps> {
  render() {
    return (
      <div className={styles.emptyContainer}>
        <Image
          width={40}
          height={40}
          src={ImgStore.noDataIcon}
          text="暂无数据"
          textClassName={styles.text}
          spacing={9}
        />
      </div>
    );
  }
}
