import React from 'react';
import { Spin } from 'antd';
import styles from './styles.less';

interface IProps {}

// TODO: 修改Loading效果
export default class TableLoading extends React.PureComponent<IProps> {
  render() {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }
}
