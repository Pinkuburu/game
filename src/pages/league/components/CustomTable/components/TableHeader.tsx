import React from 'react';
import { ColumnProps, TableHeaderProps } from '../index.d';
import classnames from 'classnames';
import styles from './styles.less';

export default class TableHeader extends React.PureComponent<TableHeaderProps<any>> {
  render() {
    const { columns, headerRowHeight, className, dataSource, width, minWidth } = this.props;
    return (
      <table
        className={classnames(styles.tableHeaderContainer, className)}
        style={{ width, minWidth }}
      >
        <colgroup>
          {columns.map((item) => (
            <col key={item.key} width={item.width} />
          ))}
        </colgroup>
        <thead>
          <tr className={styles.tableHeader}>
            {columns.map((columnsItem) => (
              <th
                align={columnsItem.headerAlign || columnsItem.align || 'center'}
                key={columnsItem.key}
                className={classnames(columnsItem.className)}
              >
                <span
                  className={classnames(
                    styles.defaultColClass,
                    styles[`align${columnsItem.headerAlign || columnsItem.align || 'center'}`]
                  )}
                  style={{ height: headerRowHeight }}
                >
                  {columnsItem.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        {/* 为了尺寸变化时thead与内容对齐，渲染一行tbody并将其隐藏 */}
        {dataSource[0] && (
          <tbody className={styles.tableContentTbody}>
            <tr>
              {columns.map((columnsItem) => (
                <td
                  align={columnsItem.align || 'center'}
                  key={columnsItem.key}
                  className={classnames(columnsItem.className)}
                >
                  <div className={styles.defaultColClass}>
                    {this.buildColumnItem(columnsItem, dataSource[0], 0)}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        )}
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
