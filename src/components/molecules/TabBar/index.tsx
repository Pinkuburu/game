import React from 'react';
import { Tabs } from 'antd';
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
    return (
      <Tabs
        defaultActiveKey="1"
        className={classnames(styles.tabBar, className)}
        tabBarGutter={40}
        {...otherProps}
      />
    );
  }
}
