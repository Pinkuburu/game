import React from 'react';
import { hasSpace, isPureNumber } from '../../../utils';
import styles from './styles.less';
import classnames from 'classnames';
import Icon from './Icon';

type OnValueChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  activePrefixIcon?: React.ReactNode;
  activeSuffixIcon?: React.ReactNode;
  onChange?: OnValueChange;
  noSpace?: boolean; // 是否允许空格
  limit?: 'PureNumber'; // 输入限制
  inputIcon?: 'Mobile' | 'Password' | 'SmsCode'; // 默认图标
}
interface IState {
  isShowPSW: boolean;
  isActive: boolean;
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
      isActive: this.isMouseEnter || this.isInputFocus
    };

    this.input = React.createRef();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleEyeClick = this.handleEyeClick.bind(this);
    this.makeInputFocus = this.makeInputFocus.bind(this);
    this.limitValue = this.limitValue.bind(this);
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
    const { onChange, noSpace, limit } = this.props;
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
    isPass && onChange && onChange(e);
  }

  render() {
    const {
      className,
      // prefixIcon,
      // activePrefixIcon,
      suffixIcon,
      activeSuffixIcon,
      type,
      value,
      onChange,
      limit,
      noSpace, // 不想要传入input中的属性需要取出来
      ...rest
    } = this.props;
    const { isActive, isShowPSW, prefixIcon, activePrefixIcon } = this.state;
    // 切换是否显示密码
    const isPSW = type === 'password';
    const newType = isPSW ? (isShowPSW ? 'text' : 'password') : type;
    console.log(rest);
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
      </div>
    );
  }
  buildIcon() {}
}
