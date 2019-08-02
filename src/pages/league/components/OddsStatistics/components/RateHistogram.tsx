import React from 'react';
import styles from './styles.less';

interface IProps {
  title: String;
  rate: number;
  wins: number;
  nums: number;
}

interface IState {
  currentRate: number;
  loading: boolean;
}

export default class RateHistogram extends React.PureComponent<IProps, IState> {
  timer: number;
  constructor(props: IProps) {
    super(props);
    this.state = { currentRate: 0, loading: false };
    this.setCurrentRate = this.setCurrentRate.bind(this);
    this.timer = 0;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setCurrentRate() {
    const { rate } = this.props;
    const { currentRate, loading } = this.state;
    if (rate === currentRate || loading) return;
    const addNum = rate > currentRate ? 1 : -1;
    const animationTotalTime = 1000;
    const repeatTimes = Math.abs(rate - currentRate);
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { currentRate } = this.state;
      const nextRate = Math.max(0, Math.min(currentRate + addNum, 100));
      const nextLoading = rate !== nextRate && 0 < nextRate && nextRate < 100;
      this.setState({ currentRate: nextRate, loading: nextLoading });
      !nextLoading && clearInterval(this.timer);
    }, animationTotalTime / repeatTimes);
  }

  render() {
    const { title, wins, nums } = this.props;
    const { currentRate } = this.state;
    this.setCurrentRate();
    return (
      <div className={styles.histogramContainer}>
        <span className={styles.rate}>{`${currentRate}%`}</span>
        <span className={styles.rateDetail}>{`(${wins}/${nums})`}</span>
        <ColorBar height={(150 * currentRate) / 100} />
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
