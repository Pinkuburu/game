import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';

interface IProps {
  color?: 'green';
  className?: string;
}

const MusicBar: React.FC<IProps> = ({ color = '', className }) => (
  <span className={classnames(styles.musicBar, className)}>
    {Array.from({ length: 5 }, (v, k) => (
      <span key={k} className={classnames(styles.bar, styles[color], styles[`n${k}`])} />
    ))}
  </span>
);

export default MusicBar;
