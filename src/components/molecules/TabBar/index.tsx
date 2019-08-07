import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';
import CustomTabPane, { CustomTabPaneProps } from './TabPane';
import memoizeOne from 'memoize-one';
import _ from 'lodash';

export { CustomTabPane };

// TODO: 还有星期的样式需要改动

interface TabInfo {
  index: number; // TabBar下方的内容区域相关
  tab: string; // TabBar中显示的文字
  key: string; // Tab的key
  disabled?: boolean; // 是否可以点击
  withoutActiveLine?: boolean; // 是否显示下划线
}

interface IProps {
  defaultActiveKey: string; // 默认的激活tab的Key
  withTabBarBottomBorder?: boolean; // 是否携带常规下滑线
  activeBorderPosition?: 'Bottom' | 'Top'; // 激活下滑线的位置
  activeWithMark?: boolean; // 是否携带透明遮罩
  paddingHorizontal?: number; // 可以控制激活下滑线的宽度(文字+左右pandding) TODO
  tabBarHeight?: 'Normal' | 'Big'; // 导航栏高度normal: 40 big: 60
  isTabFullTabBar?: boolean; // Tab是否均分整个container
  isTabBarFullContainer?: boolean; // tab(包括content)是否占据整个container
  className?: string; // 最外层容器的className
  onChange?: (tabkey: string) => void; // tabPane的点击回调
  currentActiveKey?: string; // 用户传入的activeKey决定激活哪个
}

interface IState {
  activeKey: string;
  activeIndex: number;
  customTabPaneContainerWidth: string;
  tabInfoList: TabInfo[];
}

// 初始化TabInfo
function initTabListInfo(children: any) {
  let list: TabInfo[] = [];
  if (Array.isArray(children)) {
    // chilren为多个标签
    list = children.map((reactNode, index) => ({
      tab: ((reactNode as any).props as CustomTabPaneProps).tab || '',
      disabled: ((reactNode as any).props as CustomTabPaneProps).disabled || false,
      key: (reactNode as any).key || '',
      withoutActiveLine:
        ((reactNode as any).props as CustomTabPaneProps).withoutActiveLine || false,
      index
    }));
  } else if ((children as any).props) {
    // chilren为单个标签
    const tab = ((children as any).props as CustomTabPaneProps).tab || '';
    const key = (children as any).key || 'defaultKey';
    const disabled = ((children as any).props as CustomTabPaneProps).disabled || false;
    const withoutActiveLine =
      ((children as any).props as CustomTabPaneProps).withoutActiveLine || false;
    list = [{ tab, index: 0, disabled, key, withoutActiveLine }];
  } else {
    // chilren为字符
    list = [];
  }
  return list;
}

const deepMemoizedInitTabListInfo = memoizeOne(initTabListInfo, _.isEqual);

export default class CustomTabBar extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    activeBorderPosition: 'Bottom',
    paddingHorizontal: 20,
    isTabFullTabBar: false,
    isTabBarFullContainer: false,
    tabBarHeight: 'Normal'
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      tabInfoList: [],
      activeKey: '',
      activeIndex: 0,
      customTabPaneContainerWidth: '100%'
    };
    this.handleLiClick = this.handleLiClick.bind(this);
  }

  componentDidMount() {
    this.initAboutTab();
  }

  // 初始化Tab的一些信息
  // TODO: 需要修改调用位置，不然初始的activeIndex不为第一个时会有动画效果
  initAboutTab() {
    const { children, defaultActiveKey } = this.props;
    if (children) {
      // 初始化TabInfoList
      const tabInfoList = deepMemoizedInitTabListInfo(children);
      // 初始化content的总宽度(为了滑动)
      const customTabPaneContainerWidth = tabInfoList.length ? `${tabInfoList.length}00%` : '100%';
      // 初始化传入defaultActiveKey对应的index
      const findIndexResult = tabInfoList.findIndex((item) => item.key === defaultActiveKey);
      const activeIndex = ~findIndexResult ? findIndexResult : 0;
      this.setState({
        tabInfoList,
        customTabPaneContainerWidth,
        activeIndex
      });
    }
  }

  // 切换Tab
  handleLiClick(tabInfo: TabInfo) {
    const { onChange } = this.props;
    this.setState({
      activeKey: tabInfo.key,
      activeIndex: tabInfo.index
    });
    onChange && onChange(tabInfo.key);
  }

  render() {
    const {
      withTabBarBottomBorder,
      defaultActiveKey,
      activeBorderPosition,
      activeWithMark,
      tabBarHeight,
      isTabFullTabBar,
      children,
      isTabBarFullContainer,
      className,
      currentActiveKey
    } = this.props;
    const { activeKey, activeIndex, customTabPaneContainerWidth } = this.state;
    const customTabPaneContainerStyle = {
      width: customTabPaneContainerWidth,
      right: `${activeIndex}00%`
    };
    const tabInfoList = deepMemoizedInitTabListInfo(children);
    return (
      <div
        className={classnames(
          styles.customTabBar,
          { [styles.customTabBarFullContainer]: isTabBarFullContainer },
          className
        )}
      >
        <ul
          className={classnames(styles.tabBarUl, styles[`tabBarHeight${tabBarHeight}`], {
            [styles.tabFullTabBar]: isTabFullTabBar,
            [styles.ulBottomBorder]: withTabBarBottomBorder
          })}
        >
          {tabInfoList.map((item) => (
            <li
              key={item.tab}
              className={classnames(styles[`border${activeBorderPosition}`], {
                [styles.active]: item.key === (currentActiveKey || activeKey || defaultActiveKey),
                [styles.activeWithMark]: activeWithMark,
                [styles.disabled]: item.disabled,
                [styles.withoutActiveLine]: item.withoutActiveLine
              })}
              onClick={this.handleLiClick.bind(this, item)}
            >
              {item.tab}
            </li>
          ))}
        </ul>
        <div className={styles.customTabPaneContainer} style={customTabPaneContainerStyle}>
          {children}
        </div>
      </div>
    );
  }
}
