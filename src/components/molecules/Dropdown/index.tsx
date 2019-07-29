import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import classnames from 'classnames';
import styles from './styles.less';

interface IProps extends DropDownProps {}

export default class CustomDropdown extends React.PureComponent<IProps> {
  render() {
    const { overlayClassName, ...rest } = this.props;
    return (
      <Dropdown overlayClassName={classnames(styles.customOverlay, overlayClassName)} {...rest} />
    );
  }
}
