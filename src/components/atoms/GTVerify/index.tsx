import React from 'react';
import Api from '../../../service/request/api';
import styles from './styles.less';
import classnames from 'classnames';
// 使用到的验证框地方
export enum GTVerifyName {
  LOGIN = 'captchaLogin',
  REGISTER = 'captchaRegister',
  FORGET = 'captchaForget'
}

interface IProps {
  className?: string;
  GTVerifyName: GTVerifyName;
  onSuccess?: (verifyRes: any) => void;
}
interface IState {
  isInited: boolean;
}
export default class GTVerify extends React.PureComponent<IProps, IState> {
  isInited: boolean;
  timer: number;
  captchaObj: any;
  captchaData: any;
  verifySuccessRes: any; // 可以用来判读是否已进行图形校验
  constructor(props: IProps) {
    super(props);
    this.state = {
      isInited: false
    };
    this.captchaObj = null;
    this.captchaData = null;
    this.verifySuccessRes = null;
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
  }

  // 初始化验证框
  initCaptcha() {
    Api.getGTVerify().then((data: any) => {
      this.captchaData = data;
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
    const { GTVerifyName, onSuccess } = this.props;
    const node = document.querySelector(`#${GTVerifyName}`);
    if (node) {
      captchaObj.appendTo(`#${GTVerifyName}`);
      captchaObj.onReady(() => {
        this.removeOverCaptcha();
        this.captchaObj = captchaObj;
      });
      captchaObj.onSuccess(() => {
        const res = captchaObj.getValidate();
        this.verifySuccessRes = res;
        onSuccess && onSuccess(this.getGTVerifyInfo());
      });
      captchaObj.onError((err: any) => {
        console.log(err);
        this.verifySuccessRes = null;
      });
    }
  }

  // 重置验证框
  resetGTVerify() {
    if (this.captchaObj) {
      this.captchaObj.reset();
      this.verifySuccessRes = null;
    }
  }

  // api中所需要携带图形验证参数
  getGTVerifyInfo() {
    return Object.assign(this.captchaData || {}, this.verifySuccessRes || {});
  }

  // 移除多余的验证框
  removeOverCaptcha() {
    const { GTVerifyName } = this.props;
    const parent = document.querySelector(`#${GTVerifyName}`);
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
    const { className } = this.props;
    const { isInited } = this.state;
    return (
      <div className={classnames(styles.vertifyContainer, className)}>
        <div id={this.props.GTVerifyName} className="tc">
          <div className="tc" hidden={isInited}>
            行为验证™ 安全组件加载中
          </div>
        </div>
      </div>
    );
  }
}
