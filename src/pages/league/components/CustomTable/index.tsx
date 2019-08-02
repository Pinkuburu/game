import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ColoumProps } from './index.d';
import styles from './styles.less';
import TableHeader from './components/TableHeader';

interface IProps {
  columns: ColoumProps<any>[];
  dataSource: any[];
  rowKey: string;
}

export default class CustomTable extends React.PureComponent<IProps> {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { columns = [], dataSource = [], rowKey } = this.props;
    return (
      <PerfectScrollbar>
        <div>
          <TableHeader columns={columns} />
          <table>
            <colgroup />
            <tbody>
              {dataSource.map((dataSourceItem) => (
                <tr key={dataSourceItem[rowKey]}>
                  {columns.map((columnsItem) => (
                    <td key={columnsItem.key}>{}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PerfectScrollbar>
    );
  }
}
