import React from 'react';
import styles from './styles.less';
// import Image, { ImgStore } from '@/components/atoms/Image';

interface IProps {
  height?: number;
  isNoMoreData?: boolean;
}

// TODO: 修改加载更多效果
export default class TableNoData extends React.PureComponent<IProps> {
  render() {
    const { height, isNoMoreData } = this.props;
    const heightStyle = { height };
    return (
      <div className={styles.loadMoreContainer} style={heightStyle}>
        {isNoMoreData ? '已到最底部' : '正在加载......'}
      </div>
    );
  }
}
