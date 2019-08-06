import React from 'react';
import { ColumnProps, TableContentProps } from '../index.d';
import styles from './styles.less';
import classnames from 'classnames';

export default class TableContent extends React.PureComponent<TableContentProps<any>> {
  constructor(props: TableContentProps<any>) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(record: any, index: number, event: any) {
    const { onRowClick } = this.props;
    onRowClick && onRowClick(record, index, event);
  }

  render() {
    const { dataSource, columns, rowKey, rowHeight } = this.props;
    return (
      <table className={styles.tableContentContainer}>
        <colgroup>
          {columns.map((item) => (
            <col key={item.key} width={item.width} style={{ minWidth: item.width }} />
          ))}
        </colgroup>
        <tbody className={styles.tableContentTbody}>
          {dataSource.map((dataSourceItem, index) => (
            <tr
              key={dataSourceItem[rowKey]}
              onClick={this.onRowClick.bind(this, dataSourceItem, index)}
            >
              {columns.map((columnsItem) => (
                <td
                  align={columnsItem.align || 'center'}
                  key={columnsItem.key}
                  className={classnames(columnsItem.className)}
                >
                  <div
                    className={classnames(
                      styles.defaultColClass,
                      styles[`align${columnsItem.align || 'center'}`]
                    )}
                    style={{ height: rowHeight }}
                  >
                    {this.buildColumnItem(columnsItem, dataSourceItem, index)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  buildColumnItem(columnsItem: ColumnProps<any>, dataSourceItem: any, index: number) {
    const textKey = columnsItem.dataIndex && columnsItem.dataIndex.split('.');
    const text = textKey
      ? textKey.reduce(
          (preValue, currentValue) =>
            preValue[currentValue] || correctDefaultValue(preValue[currentValue]),
          dataSourceItem
          // eslint-disable-next-line
        )
      : '';
    return columnsItem.render ? columnsItem.render(text, dataSourceItem, index) : text;
  }
}

function correctDefaultValue(value: any) {
  return value === 0 ? 0 : '';
}
