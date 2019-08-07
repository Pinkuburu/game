// 非轮播图
import React, { ReactNode } from 'react';
import classnames from 'classnames';
import memoizeOne from 'memoize-one';
import Image, { ImgStore } from '@/components/atoms/Image';
import styles from './styles.less';

interface IProps {
  itemWidth: number; // 每一个item的宽度
  visibleCount?: number; // 默认可视区域内的item数量
  defaultActiveKey?: string; // 默认显示在第一个的key值
  arrowSize?: 'small' | 'big';
  spacing?: number;
}

function calcVisibleWidth(visibleCount: number, spacing: number, itemWidth: number) {
  return (visibleCount - 1) * (spacing as number) + visibleCount * itemWidth;
}

function calcMaxOffsetX(listCount: number, visibleCount: number, perOffsetX: number) {
  return (listCount - visibleCount) * perOffsetX;
}

const memoizedCalcVisibleWidth = memoizeOne(calcVisibleWidth);
const memoizedCalcMaxOffsetX = memoizeOne(calcMaxOffsetX);

interface IState {
  offsetX: number;
  activeKey: string | number;
}

export default class CarouselList extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    arrowSize: 'small',
    spacing: 20,
    visibleCount: 6
  };
  perOffsetX: number;
  constructor(props: IProps) {
    super(props);
    const { itemWidth, spacing = 0 } = this.props;
    this.perOffsetX = itemWidth + spacing;
    this.state = { offsetX: 0, activeKey: 0 };
    this.buildItem = this.buildItem.bind(this);
    this.handleArrowLeftClick = this.handleArrowLeftClick.bind(this);
    this.handleArrowRightClick = this.handleArrowRightClick.bind(this);
  }

  handleArrowLeftClick() {
    const { offsetX } = this.state;
    if (offsetX === 0) return;
    this.setState({ offsetX: offsetX - this.perOffsetX });
  }
  handleArrowRightClick() {
    const { offsetX } = this.state;
    const { visibleCount, children } = this.props;
    if (Array.isArray(children)) {
      if (children.length <= (visibleCount as number)) return;
      const maxOffsetX = memoizedCalcMaxOffsetX(
        children.length,
        visibleCount as number,
        this.perOffsetX
      );
      if (offsetX === maxOffsetX) return;
      this.setState({ offsetX: offsetX + this.perOffsetX });
    }
  }

  render() {
    const { arrowSize, spacing, visibleCount, children, itemWidth } = this.props;
    const { offsetX } = this.state;

    const visibleContainerWidth =
      Array.isArray(children) &&
      memoizedCalcVisibleWidth(
        Math.min(visibleCount as number, children.length),
        spacing as number,
        itemWidth
      );

    return (
      <div className={styles.carouselListContainer}>
        <span className={classnames(styles.arrow, styles[arrowSize as 'small'])}>
          <Image src={ImgStore.arrow.left} onClick={this.handleArrowLeftClick} />
        </span>
        <div
          className={styles.visibleContainer}
          style={{ width: visibleContainerWidth || undefined }}
        >
          <ul className={styles.contentContainer} style={{ right: offsetX }}>
            {Array.isArray(children) ? children.map(this.buildItem) : children}
          </ul>
        </div>
        <span className={classnames(styles.arrow, styles[arrowSize as 'small'])}>
          <Image src={ImgStore.arrow.right} onClick={this.handleArrowRightClick} />
        </span>
      </div>
    );
  }
  buildItem(children: any, index: number) {
    const { spacing } = this.props;
    return (
      <li key={index} className={styles.item} style={{ marginRight: spacing }}>
        {children}
      </li>
    );
  }
}
