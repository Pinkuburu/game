import React from 'react';
import { ColoumProps } from '../index.d';
import styles from './styles.less';

interface IProps {
  columns: ColoumProps<any>[];
}

export default class TableHeader extends React.PureComponent<IProps> {
  render() {
    const { columns } = this.props;
    return (
      <table className={styles.tableHeaderContainer}>
        <colgroup>
          {columns.map((item) => (
            <col
              key={item.key}
              style={{
                width: Number.isFinite(item.width as number) ? `${item.width}px` : item.width,
                minWidth: Number.isFinite(item.width as number) ? `${item.width}px` : item.width
              }}
            />
          ))}
        </colgroup>
        <thead>
          <tr className={styles.tableHeader}>
            {columns.map((item) => (
              <th key={item.key}>
                <span>{item.title}</span>
              </th>
            ))}
          </tr>
        </thead>
      </table>
    );
  }
}
