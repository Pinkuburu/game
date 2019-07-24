import React from 'react';
interface IProps {
  initTime: number;
  unit?: 'seconds' | 'minutes' | 'hours' | 'days';
  className?: string;
  isRepeat?: boolean; // 是否重复倒计时
  onEnd?: Function;
}
interface IState {
  time: number;
}

export default class CustomCountDown extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    unit: 'seconds',
    isRepeat: false
  };

  timer: number;

  constructor(props: IProps) {
    super(props);
    this.state = {
      time: 0
    };
    this.timer = 0;
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.end = this.end.bind(this);
  }

  componentDidMount() {
    this.reset();
  }
  componentWillUnmount() {
    this.cancel();
  }

  reset() {
    this.cancel();
    this.start();
  }

  // 开始倒计时
  start() {
    const { initTime } = this.props;
    // 初始化
    this.setState({
      time: initTime
    });
    // 这边可以根据unit进行不同的倒数设置
    this.timer = setInterval(() => {
      const { time } = this.state;
      if (time === 0) {
        this.end();
      } else {
        this.setState({
          time: time - 1
        });
      }
    }, 1000);
  }

  // 倒计时结束
  end() {
    const { isRepeat, onEnd } = this.props;
    onEnd && onEnd();
    if (isRepeat) {
      this.reset();
    } else {
      this.cancel();
    }
  }

  // 取消倒计时
  cancel() {
    clearInterval(this.timer);
  }

  render() {
    const { time } = this.state;
    const { className } = this.props;
    return <span className={className}>{time}</span>;
  }
}
