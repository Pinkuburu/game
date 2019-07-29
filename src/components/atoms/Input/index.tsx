import React from 'react';
import { hasSpace, isPureNumber, globalMessage } from '../../../utils';

import styles from './styles.less';
import classnames from 'classnames';
import Icon from './components/Icon';
import SendSmsBtn from './components/SendSmsBtn';

type OnValueChange = (event: React.ChangeEvent<HTMLInputElement>, tag?: any) => void;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: OnValueChange;
  tag?: any;
  noSpace?: boolean; // 是否允许空格
  limit?: 'PureNumber'; // 输入限制
  inputIcon?: 'Mobile' | 'Password' | 'SmsCode'; // 默认图标
  // 发送验证码按钮相关
  withSendSmsBtn?: boolean; // 是否显示发送验证码按钮
  sendSms?: () => Promise<boolean>; // 发送按钮操作,通过返回布尔值决定是否开始倒数
}
interface IState {
  isShowPSW: boolean; // 是否明文显示
  isActive: boolean; // 是否为激活状态
  isSendedSms: boolean; // 是否已发送验证码
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  activePrefixIcon?: React.ReactNode;
  activeSuffixIcon?: React.ReactNode;
}
export default class CustomInput extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    noSpace: true
  };
  input: React.RefObject<any>;
  isMouseEnter: boolean;
  isInputFocus: boolean;

  constructor(props: IProps) {
    super(props);
    this.isMouseEnter = false;
    this.isInputFocus = false;

    this.state = {
      isShowPSW: false,
      isActive: this.isMouseEnter || this.isInputFocus,
      isSendedSms: false
    };

    this.input = React.createRef();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleEyeClick = this.handleEyeClick.bind(this);
    this.makeInputFocus = this.makeInputFocus.bind(this);
    this.limitValue = this.limitValue.bind(this);
    this.setIsSendedSms = this.setIsSendedSms.bind(this);
    this.resetIsSendedSms = this.resetIsSendedSms.bind(this);
  }
  componentDidMount() {
    this.initIconIfNeed();
  }

  // 关于this.state.isActive的
  handleMouseEnter(isMouseEnter: boolean) {
    this.isMouseEnter = isMouseEnter;
    this.setState({ isActive: this.isMouseEnter || this.isInputFocus });
  }
  handleInputFocus(isInputFocus: boolean) {
    this.isInputFocus = isInputFocus;
    this.setState({ isActive: this.isMouseEnter || this.isInputFocus });
  }
  handleEyeClick() {
    this.setState({ isShowPSW: !this.state.isShowPSW });
    this.makeInputFocus();
  }
  makeInputFocus() {
    this.input && this.input.current.focus();
  }

  // 如果有必要的话初始化Icon
  initIconIfNeed() {
    const { inputIcon } = this.props;
    if (inputIcon) {
      switch (inputIcon) {
        case 'Password':
          this.setState({
            prefixIcon: <Icon type="password" />,
            activePrefixIcon: <Icon type="passwordS" />
          });
          break;
        case 'Mobile':
          this.setState({
            prefixIcon: <Icon type="phone" />,
            activePrefixIcon: <Icon type="phoneS" />
          });
          break;
        case 'SmsCode':
          this.setState({
            prefixIcon: <Icon type="sms" />,
            activePrefixIcon: <Icon type="smsS" />
          });
      }
    }
  }

  // 进行一些输入的限制
  limitValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { onChange, noSpace, limit, tag } = this.props;
    const { value } = e.target;
    // 空格限制
    if (noSpace && hasSpace(value)) {
      return;
    }
    // 一些输入限制
    let isPass = true;
    switch (limit) {
      case 'PureNumber':
        isPass = isPureNumber(value);
        break;
    }
    isPass && onChange && onChange(e, tag);
  }

  // 发送验证码按钮相关
  setIsSendedSms() {
    const { sendSms } = this.props;
    sendSms &&
      sendSms().then((isSuccess) => {
        isSuccess && globalMessage('发送成功', 'success');
        this.setState({ isSendedSms: isSuccess });
      });
  }
  resetIsSendedSms() {
    this.setState({ isSendedSms: false });
  }

  render() {
    const {
      // 不想要传入input中的属性需要取出来
      limit,
      withSendSmsBtn,
      noSpace,
      className,
      sendSms,
      inputIcon,
      // 这边是想在传入input前进行一些修改的属性
      type,
      onChange,
      value,
      ...rest
    } = this.props;
    const {
      isActive,
      isShowPSW,
      prefixIcon,
      activePrefixIcon,
      suffixIcon,
      activeSuffixIcon,
      isSendedSms
    } = this.state;
    // 切换是否显示密码
    const isPSW = type === 'password';
    const newType = isPSW ? (isShowPSW ? 'text' : 'password') : type;
    return (
      <div
        className={classnames(
          styles.inputContainer,
          { [styles.inputContainerActive]: isActive },
          className
        )}
        onMouseEnter={this.handleMouseEnter.bind(this, true)}
        onMouseLeave={this.handleMouseEnter.bind(this, false)}
      >
        {prefixIcon && (
          <span className={styles.prefix} onClick={this.makeInputFocus}>
            {/* 已输入或者激活状态下显示激活已激活的图标 */}
            {value || isActive ? activePrefixIcon || prefixIcon : prefixIcon}
          </span>
        )}
        <input
          ref={this.input}
          className={styles.input}
          onFocus={this.handleInputFocus.bind(this, true)}
          onBlur={this.handleInputFocus.bind(this, false)}
          type={newType}
          value={value}
          onChange={this.limitValue}
          {...rest}
        />
        {isPSW && (
          <span
            className={classnames(styles.aboutLook, isShowPSW ? styles.unLook : styles.look)}
            onClick={this.handleEyeClick}
          />
        )}
        {suffixIcon && (
          <span className={styles.suffix}>
            {isActive ? activeSuffixIcon || suffixIcon : suffixIcon}
          </span>
        )}
        {withSendSmsBtn && (
          <span className={styles.suffix}>{this.buildSendSmsBtn(isActive, isSendedSms)}</span>
        )}
      </div>
    );
  }
  buildSendSmsBtn(isActive: boolean, isSendedSms: boolean) {
    return (
      <SendSmsBtn
        isActive={isActive}
        isSendedSms={isSendedSms}
        onClick={this.setIsSendedSms}
        onCountDownEnd={this.resetIsSendedSms}
      />
    );
  }
}
