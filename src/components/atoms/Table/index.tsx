import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/interface';
import styles from './styles.less';
import TableNoData from './NoData/index';
import classnames from 'classnames';

interface IProps<T> extends TableProps<T> {
  rowClassName?: (record: T, index: number) => string;
}
class CustomTable<T> extends React.Component<IProps<T>> {

  static defaultProps = {
    dataSource: []
  };
  constructor(props: IProps<T>) {
    super(props);
    this.customRowClassName = this.customRowClassName.bind(this);
  }


  customRowClassName(record: T, index: number) {
    const { rowClassName } = this.props;
    return classnames(styles.customRow, rowClassName && rowClassName(record, index));
  }

  render() {
    const { dataSource, rowClassName, ...rest } = this.props;
    const isNoData = dataSource && dataSource.length === 0;
    return (
      <div
        className={classnames(styles.container, {
          [styles.hideTable]: isNoData
        })}
      >
        <Table
          dataSource={dataSource}
          rowClassName={this.customRowClassName}
          {...rest}
          expandIconAsCell={false}
        />
        {isNoData && <TableNoData />}
      </div>
    );
  }
}

export default CustomTable;
