import React from 'react';
import styles from './index.less';
import classnames from 'classnames';
const PageLoading: React.FC = () => (
  <div className={styles.container}>
    <div className={styles['sk-cube-grid']}>
      <div className={classnames(styles['sk-cube'], styles['sk-cube1'])} />
      <div className={classnames(styles['sk-cube'], styles['sk-cube2'])} />
      <div className={classnames(styles['sk-cube'], styles['sk-cube3'])} />
      <div className={classnames(styles['sk-cube'], styles['sk-cube4'])} />
      <div className={classnames(styles['sk-cube'], styles['sk-cube5'])} />
      <div className={classnames(styles['sk-cube'], styles['sk-cube6'])} />
      <div className={classnames(styles['sk-cube'], styles['sk-cube7'])} />
      <div className={classnames(styles['sk-cube'], styles['sk-cube8'])} />
      <div className={classnames(styles['sk-cube'], styles['sk-cube9'])} />
    </div>
  </div>
);

export default PageLoading;
