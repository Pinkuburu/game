import React from 'react';
import CustomTabBar from './index';
import styles from './styles.less';
import { TabsProps } from 'antd/lib/tabs';
import classnames from 'classnames';
// const { TabPane } = Tabs;

interface IProps extends TabsProps {
  className?: string;
}

export default class TabBar extends React.PureComponent<IProps> {
  render() {
    const { className, ...otherProps } = this.props;
    return <CustomTabBar className={classnames(styles.dateTabBar, className)} {...otherProps} />;
  }
}
