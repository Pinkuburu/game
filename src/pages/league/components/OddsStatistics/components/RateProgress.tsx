import React from 'react';
import styles from './styles.less';
interface IProps {
  nums: number;
  total: number;
}

interface IState {
  percent: number;
}

export default class RateProgress extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { nums, total } = this.props;
    this.state = {
      percent: total ? Math.round((nums / total) * 100) : 0
    };
  }

  componentDidMount() {
    const { percent } = this.state;
    let ele = document.getElementById('progress');
    let ctx = ele && (ele as HTMLCanvasElement).getContext('2d');
    const canvasWidth = 170; // 画布宽
    const canvasHeight = 170; // 画布高
    const lineWidht = 15; // 线宽
    const r = canvasWidth / 2 - lineWidht / 2; // 圆环半径
    if (ctx) {
      // 创建背景圆环
      ctx.lineWidth = lineWidht; // 环形宽度
      ctx.strokeStyle = '#2f2345'; // 整个环形的背景色
      ctx.lineCap = 'square'; // 进度条边缘的形状
      ctx.beginPath(); // 开始一个新的路径
      ctx.arc(canvasWidth / 2, canvasHeight / 2, r, 0, 2 * Math.PI, false); // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
      ctx.stroke(); // 对当前路径进行描边
      // 创建渐变圆环
      let g = ctx.createLinearGradient(85, 0, 20, 20); // 创建渐变对象  渐变开始点和渐变结束点
      g.addColorStop(0, '#713FA0'); // 添加颜色点
      g.addColorStop(1, '#AD75CC');
      ctx.lineWidth = lineWidht + 1; // 设置线条宽度
      ctx.strokeStyle = g;
      ctx.beginPath(); // 开始一个新的路径
      ctx.arc(canvasWidth / 2, canvasHeight / 2, r, Math.PI, Math.PI, false);
      ctx.stroke(); // 对当前路径进行描边
    }
  }

  render() {
    const { nums, total } = this.props;
    const { percent } = this.state;
    return (
      <div className={styles.progressContainer}>
        <canvas id="progress" width={170} height={170}>
          您的浏览器暂不支持canvas标签！
        </canvas>
        <div className={styles.info}>
          <span className={styles.rate}>{`${percent}%`}</span>
          <span className={styles.rateDetail}>{`${nums}/${total}`}</span>
        </div>
      </div>
    );
  }
}
