import React from 'react';
import classnames from 'classnames';
import styles from './styles.less';

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export default class CustomTextArea extends React.PureComponent<IProps> {
  render() {
    const { className, ...rest } = this.props;
    return <textarea className={classnames(styles.customTextarea, className)} {...rest} />;
  }
}
