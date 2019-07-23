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
  isMouseEnter: boolean;
  isFocus: boolean;
  isShowPSW: boolean;
  isDone: boolean;
}
export default class CustomInput extends React.PureComponent<IProps, IState> {
  input: React.RefObject<any>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isFocus: false,
      isMouseEnter: false,
      isShowPSW: false,
      isDone: false
    };
    this.input = React.createRef();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleEyeClick = this.handleEyeClick.bind(this);
    this.makeInputFocus = this.makeInputFocus.bind(this);
  }

  handleMouseEnter(isMouseEnter: boolean, e: React.MouseEvent) {
    this.setState({
      isMouseEnter
    });
  }
  handleInputFocus(isFocus: boolean) {
    this.setState({
      isFocus
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
      ...rest
    } = this.props;
    const { isFocus, isMouseEnter, isShowPSW } = this.state;
    const isActive = isMouseEnter || isFocus;
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
        <input
          ref={this.input}
          className={styles.input}
          onFocus={this.handleInputFocus.bind(this, true)}
          onBlur={this.handleInputFocus.bind(this, false)}
          type={newType}
          {...rest}
        />
        {isPSW && (
          <span
            className={classnames(styles.icon, isShowPSW ? styles.unLook : styles.look)}
            onClick={this.handleEyeClick}
          />
        )}
        {prefixIcon && (
          <span className={styles.prefix} onClick={this.makeInputFocus}>
            {isActive ? activePrefixIcon || prefixIcon : prefixIcon}
          </span>
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
