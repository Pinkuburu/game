import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ColoumProps } from './index.d';
import styles from './styles.less';
import TableHeader from './components/TableHeader';
import TableContent from './components/TableContent';
interface IProps {
  columns: ColoumProps<any>[];
  dataSource: any[];
  loading?: boolean;
  fixedHeader?: boolean; // 固定表头
  rowKey: string;
  headerRowHeight?: number; // header高
  rowHeight?: number; // 内容行高
  scroll?: {
    x: number; // 固定水平方向宽度
    y: number; // 固定垂直方向内容的高度
  };
}

export default class CustomTable extends React.PureComponent<IProps> {
  static defaultProps = {
    columns: [],
    dataSource: [],
    rowHeight: 100,
    headerRowHeight: 30,
    fixedHeader: true
  };

  componentDidMount() {
    console.log(this.props);
  }
  onYReachEnd() {
    console.log('到达最底部');
  }

  render() {
    const {
      columns,
      dataSource,
      rowKey,
      rowHeight,
      headerRowHeight = 30,
      fixedHeader,
      scroll = { x: 1000, y: 500 }
    } = this.props;
    return (
      <div>
        {fixedHeader && <TableHeader columns={columns} headerRowHeight={headerRowHeight} />}
        <div style={{ height: scroll.y && scroll.y + (fixedHeader ? 0 : headerRowHeight) }}>
          <PerfectScrollbar onYReachEnd={this.onYReachEnd}>
            <div style={{ width: 500, height: 1 }} />
            {!fixedHeader && <TableHeader columns={columns} headerRowHeight={headerRowHeight} />}
            <TableContent
              columns={columns}
              dataSource={dataSource}
              rowKey={rowKey}
              rowHeight={rowHeight}
            />
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}
