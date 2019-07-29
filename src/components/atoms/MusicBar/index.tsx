import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';
const MusicBar: React.FC = () => (
  <span className={styles.musicBar}>
    {Array.from({ length: 5 }, (v, k) => (
      <span key={k} className={classnames(styles.bar, styles[`n${k}`])} />
    ))}
  </span>
);

export default MusicBar;
