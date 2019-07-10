import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/interface';
import styles from './index.module.less';

// 若要使用react-table 请之后修改
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
