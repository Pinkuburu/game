import React from 'react';
import styles from './styles.less';
export interface CustomTabPaneProps {
  tab: string; // 在TabBar中显示的文字
  disabled?: boolean; // 禁止切换
  key: string;
  children: any;
  withoutActiveLine?: boolean; // 是否显示下划线
}

const CustomTabPane: React.FC<CustomTabPaneProps> = ({ children }) => (
  <div className={styles.customTabPane}>{children}</div>
);
export default CustomTabPane;
