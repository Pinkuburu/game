import React from 'react';
import styles from './styles.less';
export interface CarouselItemProps {
  tab: string; // 在TabBar中显示的文字
  disabled?: boolean; // 禁止切换
  key: string;
  children?: any;
  withoutActiveLine?: boolean; // 是否显示下划线
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => (
  <div className={styles.CarouselItem}> {children}</div>
);
export default CarouselItem;
