import React from 'react';
import Api from '../../../service/request/api';
import styles from './styles.less';

export enum GTVertifyName {
  LOGIN = 'captchaLogin'
}

interface IProps {
  GTVertifyName: GTVertifyName;
}
interface IState {
  inited: boolean;
}
export default class GTVertify extends React.PureComponent<IProps, IState> {
  myCaptcha: React.RefObject<any>;
  myText: React.RefObject<any>;
  constructor(props: IProps) {
    super(props);
    this.myCaptcha = React.createRef();
    this.myText = React.createRef();
    this.state = {
      inited: false
    };
  }
  componentDidMount() {
    const { inited } = this.state;
    inited ||
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
        this.setState({
          inited: true
        });
      });
  }

  handlerEmbed(captchaObj: any) {
    const { GTVertifyName } = this.props;
    captchaObj.appendTo(`#${GTVertifyName}`);
    captchaObj.onReady(() => {
      this.myText.current && this.myText.current.classList.add('hide');
    });

    captchaObj.onSuccess(() => {
      const res = captchaObj.getValidate();
    });
  }

  render() {
    console.log(this.props.GTVertifyName);
    return (
      <div className={styles.vertifyContainer}>
        <div id={this.props.GTVertifyName} className="tc" ref={this.myCaptcha}>
          <div className="tc" ref={this.myText}>
            行为验证™ 安全组件加载中
          </div>
        </div>
      </div>
    );
  }
}
