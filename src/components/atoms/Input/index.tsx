import React from 'react';

import styles from './styles.less';
import classnames from 'classnames';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  activePrefixIcon?: React.ReactNode;
  activeSuffixIcon?: React.ReactNode;
}
interface IState {
  isShowPSW: boolean;
  isActive: boolean;
}
export default class CustomInput extends React.PureComponent<IProps, IState> {
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
  }

  handleMouseEnter(isMouseEnter: boolean) {
    this.isMouseEnter = isMouseEnter;
    this.setState({
      isActive: this.isMouseEnter || this.isInputFocus
    });
  }
  handleInputFocus(isInputFocus: boolean) {
    this.isInputFocus = isInputFocus;
    this.setState({
      isActive: this.isMouseEnter || this.isInputFocus
    });
  }
  handleEyeClick() {
    this.setState({
      isShowPSW: !this.state.isShowPSW
    });
    this.makeInputFocus();
  }
  makeInputFocus() {
    this.input && this.input.current.focus();
  }

  render() {
    const {
      className,
      prefixIcon,
      activePrefixIcon,
      suffixIcon,
      activeSuffixIcon,
      type,
      value,
      ...rest
    } = this.props;
    const { isActive, isShowPSW } = this.state;
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
          {...rest}
        />
        {isPSW && (
          <span
            className={classnames(styles.icon, isShowPSW ? styles.unLook : styles.look)}
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
}
