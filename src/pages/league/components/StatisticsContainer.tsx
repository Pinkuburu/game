import React from 'react';
import styles from './styles.less';
import Image, { ImgStore } from '@/components/atoms/Image';

interface IProps {
  children: any;
  title: string;
  action?: React.ReactNode;
}

export default class StatisticsContainer extends React.PureComponent<IProps> {
  render() {
    const { title, children, action } = this.props;
    return (
      <div className={styles.statisticsContainer}>
        <div className={styles.title}>
          <span>{title}</span>
          <div className={styles.actionContainer}>
            {action}
            <Image src={ImgStore.iconHelp} className={styles.icon} />
          </div>
        </div>
        {children}
      </div>
    );
  }
}
