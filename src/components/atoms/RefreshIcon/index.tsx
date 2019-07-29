import React from 'react';
import PropTypes from 'prop-types';
interface IProps {
  onRefresh: Function;
}
interface IState {
  seconds: number;
}

class RefreshIcon extends React.PureComponent<IProps, IState> {
  static propTypes = {
    onRefresh: PropTypes.func.isRequired
  };

  // 存储定时器timer
  timer: number = 0;

  constructor(props: IProps) {
    super(props);
    this.state = {
      seconds: 10
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.resetCountDown = this.resetCountDown.bind(this);
  }

  componentDidMount() {
    this.resetCountDown();
  }

  // 重置计时器
  resetCountDown() {
    // 清除原本计时器
    clearInterval(this.timer);
    // 恢复10
    this.setState({
      seconds: 10
    });
    // 启动倒计时
    this.timer = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1 > 0 ? seconds - 1 : 10
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleRefresh() {
    this.resetCountDown();
    this.props.onRefresh && this.props.onRefresh();
  }

  render() {
    return (
      <svg
        width="28px"
        height="28px"
        viewBox="0 0 28 28"
        version="1.1"
        onClick={this.handleRefresh}
      >
        <defs>
          <text
            id="text-1"
            fontFamily="Industry-BlackItalic, Industry"
            fontSize="12"
            fontStyle="italic"
            fontWeight="700"
            fill="#CA59FF"
          >
            <tspan x={this.state.seconds >= 10 ? '11' : '14'} y="24">
              {this.state.seconds}
            </tspan>
          </text>
          <filter
            x="-25.0%"
            y="-37.5%"
            width="150.0%"
            height="175.0%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix
              values="0 0 0 0 0.607843137   0 0 0 0 0.247058824   0 0 0 0 0.956862745  0 0 0 1 0"
              type="matrix"
              in="shadowBlurOuter1"
            />
          </filter>
        </defs>
        <g id="1.0.0首页" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="1.0.2首页_赛程结果" transform="translate(-222.000000, -414.000000)" fill="#CA59FF">
            <g id="分组-2" transform="translate(217.000000, 409.000000)">
              <g id="分组">
                <path
                  d="M6.00462565,18.6497966 L7.87547315,19.6445438 C8.20934473,25.4986265 13.0623133,30.1428571 19,30.1428571 C21.0778442,30.1428571 23.0228546,29.5741284 24.687856,28.5838463 L26.5581517,29.5783002 C24.428327,31.1027671 21.8189435,32 19,32 C11.8202983,32 6,26.1797017 6,19 C6,18.8828974 6.00154834,18.7661565 6.00462565,18.6497966 Z M9.5843181,10.0364309 C11.952285,7.5497877 15.2951563,6 19,6 C26.1797017,6 32,11.8202983 32,19 C32,19.9594657 31.8960579,20.8946544 31.6988199,21.7949201 L29.9843661,20.8833288 C30.0885804,20.2711223 30.1428571,19.6418996 30.1428571,19 C30.1428571,12.8459699 25.1540301,7.85714286 19,7.85714286 C16.0120939,7.85714286 13.298861,9.03315853 11.2979213,10.9475699 L9.5843181,10.0364309 Z"
                  id="合并形状"
                  fillRule="nonzero"
                  transform="translate(19.000000, 19.000000) rotate(-35.000000) translate(-19.000000, -19.000000) "
                >
                  <animateTransform
                    attributeName="transform"
                    begin="0s"
                    dur="10s"
                    type="rotate"
                    from="0 50% 50%"
                    to="360 50% 50%"
                    repeatCount="indefinite"
                  />
                </path>
                <g id="10" fillOpacity="1">
                  <use filter="url(#filter-2)" xlinkHref="#text-1" />
                  <use xlinkHref="#text-1" />
                </g>
                <polygon
                  id="三角形"
                  transform="translate(29.998880, 14.390366) rotate(-210.000000) translate(-29.998880, -14.390366) "
                  points="29.9988804 11.0528589 34.9988804 17.7278723 24.9988804 17.7278723"
                />
                <polygon
                  id="三角形-copy"
                  transform="translate(7.998880, 23.390366) scale(-1, -1) rotate(-210.000000) translate(-7.998880, -23.390366) "
                  points="7.99888038 20.0528589 12.9988804 26.7278723 2.99888038 26.7278723"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
export default RefreshIcon;
