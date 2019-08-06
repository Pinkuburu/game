import React from 'react';
import _ from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ColumnProps } from './index.d';
import styles from './styles.less';
import TableHeader from './components/TableHeader';
import TableContent from './components/TableContent';
import TableLoading from './components/TableLoading';
import TableLoadMore from './components/TableLoadMore';

interface IProps {
  columns: ColumnProps<any>[];
  dataSource: any[];
  loading?: boolean; // 加载状态
  fixedHeader?: boolean; // 固定表头
  rowKey: string; // dataScource中作为key的字段名
  headerRowHeight?: number; // header高
  rowHeight?: number; // 内容行高
  scroll?: {
    x?: number; // 水平方向宽度
    y?: number; // 垂直方向内容的高度
    minX?: number; // 水平方向的最小宽度
    maxY?: number; // 垂直方向内容的最大高度
  };
  onLoadMore?: () => void;
  isNoMoreData?: boolean;
}

interface IState {
  // canDocumentScroll: boolean;
}

export default class CustomTable extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    columns: [],
    dataSource: [],
    headerRowHeight: 30,
    fixedHeader: true
  };
  scrollRefX: any;
  scrollRefY: any;
  tableContainer: React.RefObject<any>;
  canDocumentScroll: boolean;
  constructor(props: IProps) {
    super(props);
    this.canDocumentScroll = true;
    this.tableContainer = React.createRef();
    this.onWheel = this.onWheel.bind(this);
    this.onYReachEnd = this.onYReachEnd.bind(this);
    this.checkScrollY = this.checkScrollY.bind(this);
  }

  componentDidMount() {
    this.tableContainer.current &&
      (this.tableContainer.current as HTMLElement).addEventListener('wheel', this.onWheel, {
        passive: false
      });
  }

  componentWillUnmount() {
    this.tableContainer.current &&
      (this.tableContainer.current as HTMLElement).removeEventListener('wheel', this.onWheel);
  }

  onWheel(e: any) {
    console.log('阻止滚动');
    !this.canDocumentScroll && e.preventDefault();
  }

  onYReachEnd() {
    const { loading, onLoadMore, isNoMoreData } = this.props;
    if (loading || isNoMoreData) return;
    onLoadMore && onLoadMore();
  }

  // 同步两个X滚动轴
  onScrollX(tableContainer: any) {
    const node = tableContainer.querySelector('.scrollbar-container');
    node && (node.scrollLeft = tableContainer.scrollLeft);
  }

  // 检查是否有y方向上的滑动轴
  checkScrollY() {
    if (this.tableContainer.current) {
      this.canDocumentScroll = true;
      if (this.tableContainer.current.querySelector('.scrollbar-container .ps--active-y')) {
        this.canDocumentScroll = false;
      }
    }
    return true;
  }

  render() {
    const {
      columns,
      dataSource,
      rowKey,
      rowHeight,
      headerRowHeight = 30,
      fixedHeader,
      scroll = { x: undefined, y: undefined, minX: undefined, maxY: undefined },
      loading,
      onLoadMore,
      isNoMoreData
    } = this.props;
    this.checkScrollY();
    return (
      <div ref={this.tableContainer} className={styles.tableContainer}>
        {loading && <TableLoading />}
        <PerfectScrollbar
          options={{ suppressScrollY: true }}
          onScrollX={this.onScrollX}
          containerRef={(ref) => {
            this.scrollRefX = ref;
          }}
        >
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
            <div>
              <PerfectScrollbar
                onYReachEnd={_.throttle(this.onYReachEnd, 10000)}
                options={{ suppressScrollX: true }}
                style={{
                  width: scroll.x,
                  minWidth: scroll.minX,
                  minHeight: 200,
                  height: scroll.y && scroll.y + (fixedHeader ? 0 : headerRowHeight),
                  maxHeight: scroll.maxY && scroll.maxY + (fixedHeader ? 0 : headerRowHeight)
                }}
                containerRef={(ref) => {
                  this.scrollRefY = ref;
                }}
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
                {onLoadMore && dataSource.length && (
                  <TableLoadMore height={rowHeight} isNoMoreData={isNoMoreData} />
                )}
              </PerfectScrollbar>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}
