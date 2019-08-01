import React from 'react';
import styles from './styles.less';

interface IProps {
  children: any;
  title: string;
}

export default class StatisticsContainer extends React.PureComponent<IProps> {
  render() {
    const { title, children } = this.props;
    return (
      <div className={styles.statisticsContainer}>
        <div className={styles.title}>{title}</div>
        {children}
      </div>
    );
  }
}
