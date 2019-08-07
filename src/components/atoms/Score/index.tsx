import React from 'react';
import styles from './styles.less';

interface IProps {
  value: number | string;
}

export default class Score extends React.PureComponent<IProps> {
  render() {
    return <span className={styles.score}>{this.props.value}</span>;
  }
}
