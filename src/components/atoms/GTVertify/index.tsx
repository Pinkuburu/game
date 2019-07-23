import React from 'react';
import Api from '../../../service/request/api';
import styles from './styles.less';

// 使用到的验证框地方
export enum GTVertifyName {
  LOGIN = 'captchaLogin',
  REGISTER = 'captchaRegister'
}

interface IProps {
  GTVertifyName: GTVertifyName;
}
interface IState {
  isInited: boolean;
}
export default class GTVertify extends React.PureComponent<IProps, IState> {
  isInited: boolean;
  timer: number;
  captchaObj: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isInited: false
    };

    this.captchaObj = null;
    this.isInited = false;
    this.timer = 0;
    this.handlerEmbed = this.handlerEmbed.bind(this);
    this.removeOverCaptcha = this.removeOverCaptcha.bind(this);
    this.checkCaptchaIsInited = this.checkCaptchaIsInited.bind(this);
    this.initCaptcha = this.initCaptcha.bind(this);
  }
  componentDidMount() {
    this.checkCaptchaIsInited();
    this.initCaptcha();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.removeOverCaptcha();
  }

  // 初始化验证框
  initCaptcha() {
    Api.getGTVertify().then((data: any) => {
      (window as any).initGeetest(
        {
          gt: data.gt,
          challenge: data.challenge,
          new_captcha: data.new_captcha,
          product: 'float', // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
          offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
          width: '100%'

          // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
        },
        (captchaObj: any) => this.handlerEmbed(captchaObj)
      );
    });
  }

  handlerEmbed(captchaObj: any) {
    const { GTVertifyName } = this.props;
    captchaObj.appendTo(`#${GTVertifyName}`);
    captchaObj.onReady(() => {
      this.removeOverCaptcha();
      this.captchaObj = captchaObj;
    });
    captchaObj.onSuccess(() => {
      const res = captchaObj.getValidate();
    });
  }

  // 移除多余的验证框
  removeOverCaptcha() {
    const { GTVertifyName } = this.props;
    const parent = document.querySelector(`#${GTVertifyName}`);
    const childNode = parent && parent.childNodes;
    if (childNode && childNode.length > 1) {
      parent && parent.removeChild(childNode[1]);
    }
  }

  // 检查验证框是否加载完毕
  checkCaptchaIsInited() {
    this.timer = setInterval(() => {
      if (this.captchaObj) {
        this.setState({ isInited: true });
        clearInterval(this.timer);
      }
    }, 100);
  }

  render() {
    const { isInited } = this.state;
    return (
      <div className={styles.vertifyContainer}>
        <div id={this.props.GTVertifyName} className="tc">
          <div className="tc" hidden={isInited}>
            行为验证™ 安全组件加载中
          </div>
        </div>
      </div>
    );
  }
}
