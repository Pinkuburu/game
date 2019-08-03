import React from 'react';
import { ColoumProps } from '../index.d';
import classnames from 'classnames';
import styles from './styles.less';

interface IProps {
  columns: ColoumProps<any>[];
  headerRowHeight?: number;
}

export default class TableHeader extends React.PureComponent<IProps> {
  render() {
    const { columns, headerRowHeight } = this.props;
    return (
      <table className={styles.tableHeaderContainer}>
        <colgroup>
          {columns.map((item) => (
            <col key={item.key} width={item.width} />
          ))}
        </colgroup>
        <thead>
          <tr className={styles.tableHeader}>
            {columns.map((columnsItem) => (
              <th
                align={columnsItem.align || 'center'}
                key={columnsItem.key}
                className={classnames(columnsItem.className)}
              >
                <span
                  className={classnames(
                    styles.defaultColClass,
                    styles[`align${columnsItem.align || 'center'}`]
                  )}
                  style={{ height: headerRowHeight }}
                >
                  {columnsItem.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
      </table>
    );
  }
}
