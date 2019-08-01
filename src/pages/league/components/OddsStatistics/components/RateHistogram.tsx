import React from 'react';
import styles from './styles.less';

interface IProps {
  title: String;
  rate: number;
  wins: number;
  nums: number;
}

export default class RateHistogram extends React.PureComponent<IProps> {
  render() {
    const { title, rate, wins, nums } = this.props;
    return (
      <div className={styles.histogramContainer}>
        <span className={styles.rate}>{`${rate}%`}</span>
        <span className={styles.rateDetail}>{`(${wins}/${nums})`}</span>
        <ColorBar height={(150 * rate) / 100} />
        <span className={styles.hr} />
        <span className={styles.xTitle}>{title}</span>
      </div>
    );
  }
}

interface ColorBarProps {
  height: number;
}

const ColorBar: React.FC<ColorBarProps> = ({ height }) => (
  <div className={styles.colarBarContainer} style={{ height }}>
    <span className={styles.decorate} />
    <span className={styles.bar} />
  </div>
);
