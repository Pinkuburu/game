import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/interface';
import styles from './index.less';

interface IProps<T> extends TableProps<T> {}

class CustomTable<T> extends React.Component<IProps<T>> {
  render() {
    return (
      <div className={styles.container}>
        <Table {...this.props} />
      </div>
    );
  }
}

export default CustomTable;
