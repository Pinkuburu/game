import React from 'react';
import styles from './styles.less';
interface IProps {
  nums: number;
  total: number;
}
interface IState {
  currentPercent: number;
  loading: boolean;
}

const canvasWidth = 170; // 画布宽
const canvasHeight = 170; // 画布高
const lineWidht = 15; // 线宽
const r = canvasWidth / 2 - lineWidht / 2; // 圆环半径
const PI = Math.PI;

export default class RateProgress extends React.PureComponent<IProps, IState> {
  timer: number;

  constructor(props: IProps) {
    super(props);
    this.state = { currentPercent: 0, loading: false };
    this.setCurrentPercent = this.setCurrentPercent.bind(this);
    this.timer = 0;
  }

  componentDidMount() {
    this.draw(0);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  draw(percent: number) {
    let ele = document.getElementById('progress');
    let ctx = ele && (ele as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      this.drawBg(ctx);
      this.drawProgress(ctx, percent);
    }
  }

  drawBg(ctx: CanvasRenderingContext2D) {
    // 创建背景圆环
    ctx.save();
    ctx.lineWidth = lineWidht; // 环形宽度
    ctx.strokeStyle = '#2f2345'; // 整个环形的背景色
    ctx.lineCap = 'square'; // 进度条边缘的形状
    ctx.beginPath(); // 开始一个新的路径
    ctx.arc(canvasWidth / 2, canvasHeight / 2, r, 0, 2 * PI, false); // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    ctx.stroke(); // 对当前路径进行描边
    ctx.closePath();
    ctx.restore();
  }

  drawProgress(ctx: CanvasRenderingContext2D, percent: number) {
    // 创建渐变圆环
    ctx.save();
    let g = ctx.createLinearGradient(85, 0, 0, 0); // 创建渐变对象  渐变开始点和渐变结束点
    g.addColorStop(0, '#713FA0'); // 添加颜色点
    g.addColorStop(1, '#AD75CC');
    ctx.lineWidth = lineWidht; // 设置线条宽度
    ctx.strokeStyle = g;
    ctx.beginPath(); // 开始一个新的路径
    ctx.arc(
      canvasWidth / 2,
      canvasHeight / 2,
      r,
      -PI / 2,
      -PI / 2 + (percent / 100) * (2 * PI),
      false
    );
    ctx.stroke(); // 对当前路径进行描边
    ctx.closePath();
    ctx.restore();
  }

  // FIXME: 在loading为true时。如果传入的数据发生了改变(nums, total)。最终的percent将不会相应改变
  setCurrentPercent() {
    const { nums, total } = this.props;
    const { currentPercent, loading } = this.state;
    const percent = total ? Math.round((nums / total) * 100) : 0;
    if (percent === currentPercent || loading) return;
    const addNum = percent > currentPercent ? 1 : -1;
    const animationTotalTime = 1000;
    const repeatTimes = Math.abs(percent - currentPercent);
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { currentPercent } = this.state;
      const nextPercent = Math.max(0, Math.min(currentPercent + addNum, 100));
      const nextLoading = percent !== nextPercent && 0 < nextPercent && nextPercent < 100;
      this.draw(nextPercent);
      this.setState({ currentPercent: nextPercent, loading: nextLoading });
      !nextLoading && clearInterval(this.timer);
    }, animationTotalTime / repeatTimes);
  }

  render() {
    const { nums, total } = this.props;
    const { currentPercent } = this.state;
    this.setCurrentPercent();
    return (
      <div className={styles.progressContainer}>
        <canvas id="progress" width={170} height={170}>
          您的浏览器暂不支持canvas标签！
        </canvas>
        <div className={styles.info}>
          <span className={styles.rate}>{`${currentPercent}%`}</span>
          <span className={styles.rateDetail}>{`${nums}/${total}`}</span>
        </div>
      </div>
    );
  }
}
