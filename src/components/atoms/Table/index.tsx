import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/interface';
import styles from './styles.less';
import TableNoData from './NoData/index';
import classnames from 'classnames';
interface IProps<T> extends TableProps<T> {}

class CustomTable<T> extends React.Component<IProps<T>> {
  static defaultProps = {
    dataSource: []
  };
  render() {
    const isNoData = this.props.dataSource && this.props.dataSource.length === 0;
    return (
      <div
        className={classnames(styles.container, {
          [styles.hideTable]: isNoData
        })}
      >
        <Table {...this.props} />
        {isNoData && <TableNoData />}
      </div>
    );
  }
}

export default CustomTable;
