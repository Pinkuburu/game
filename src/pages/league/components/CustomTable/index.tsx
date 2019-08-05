import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ColoumProps } from './index.d';
import styles from './styles.less';
import TableHeader from './components/TableHeader';
import TableContent from './components/TableContent';
interface IProps {
  columns: ColoumProps<any>[];
  dataSource: any[];
  loading?: boolean; // 加载状态
  fixedHeader?: boolean; // 固定表头
  rowKey: string; // dataScource中作为key的字段名
  headerRowHeight?: number; // header高
  rowHeight?: number; // 内容行高
  scroll?: {
    x: number; // 水平方向宽度
    y: number; // 垂直方向内容的高度
    minX: number; // 水平方向的最小宽度
    maxY: number; // 垂直方向内容的最大高度
  };
}

interface IState {
  // canDocumentScroll: boolean;
}

export default class CustomTable extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    columns: [],
    dataSource: [],
    rowHeight: 100,
    headerRowHeight: 30,
    fixedHeader: true
  };
  container: React.RefObject<any>;
  canDocumentScroll: boolean;
  constructor(props: IProps) {
    super(props);
    this.canDocumentScroll = true;
    // this.state = {
    //   canDocumentScroll: true
    // };
    this.onWheel = this.onWheel.bind(this);
    this.container = React.createRef();
  }

  componentDidMount() {
    this.container.current &&
      (this.container.current as HTMLElement).addEventListener('wheel', this.onWheel, {
        passive: false
      });
  }

  componentWillUnmount() {
    this.container.current &&
      (this.container.current as HTMLElement).removeEventListener('wheel', this.onWheel);
  }

  onWheel(e: any) {
    console.log('阻止滚动');
    e.preventDefault();
  }

  onYReachEnd() {
    console.log('到达最底部');
  }

  // 同步两个滚动轴
  onScrollX(container: any) {
    const node = container.querySelector('.scrollbar-container');
    node && (node.scrollLeft = container.scrollLeft);
  }
  // 检查是否有y方向上的滑动轴
  checkScrollY() {
    if (this.container.current) {
      console.log(this.container.current.querySelector('.ps'));
    }
  }

  render() {
    const {
      columns,
      dataSource,
      rowKey,
      rowHeight,
      headerRowHeight = 30,
      fixedHeader,
      scroll = { x: undefined, y: undefined, minX: undefined, maxY: 500 }
    } = this.props;
    this.checkScrollY();
    return (
      <div ref={this.container}>
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
            <div>
              <PerfectScrollbar
                onYReachEnd={this.onYReachEnd}
                option={{ suppressScrollX: true }}
                style={{
                  width: scroll.x,
                  minWidth: scroll.minX,
                  minHeight: 200,
                  height: scroll.y && scroll.y + (fixedHeader ? 0 : headerRowHeight),
                  maxHeight: scroll.maxY && scroll.maxY + (fixedHeader ? 0 : headerRowHeight)
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
              </PerfectScrollbar>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}
