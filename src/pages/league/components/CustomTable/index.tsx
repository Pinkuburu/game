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
    minX: number; // 固定水平方向的最小宽度
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

  onYReachEnd() {
    console.log('到达最底部');
  }

  // 同步两个滚动轴
  onScrollX(container: any) {
    const node = container.querySelector('.scrollbar-container');
    node && (node.scrollLeft = container.scrollLeft);
  }

  render() {
    const {
      columns,
      dataSource,
      rowKey,
      rowHeight,
      headerRowHeight = 30,
      fixedHeader,
      scroll = { x: undefined, y: 500, minX: undefined }
    } = this.props;
    return (
      <div>
        <PerfectScrollbar option={{ suppressScrollY: true }} onScrollX={this.onScrollX}>
          <div>
            {fixedHeader && (
              <TableHeader
                columns={columns}
                headerRowHeight={headerRowHeight}
                dataSource={dataSource}
                width={scroll.x}
                minWidth={scroll.minX}
              />
            )}
            <div style={{ height: scroll.y && scroll.y + (fixedHeader ? 0 : headerRowHeight) }}>
              <PerfectScrollbar
                onYReachEnd={this.onYReachEnd}
                option={{ suppressScrollX: true }}
                style={{ width: scroll.x, minWidth: scroll.minX }}
              >
                {!fixedHeader && (
                  <TableHeader
                    columns={columns}
                    headerRowHeight={headerRowHeight}
                    dataSource={dataSource}
                    width={scroll.x}
                    minWidth={scroll.minX}
                  />
                )}
                <TableContent
                  columns={columns}
                  dataSource={dataSource}
                  rowKey={rowKey}
                  rowHeight={rowHeight}
                />
              </PerfectScrollbar>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}
