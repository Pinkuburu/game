import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import styles from './styles.less';

interface IProps extends SelectProps {
  children?: any;
}
const { Option, OptGroup } = Select;

export { Option, OptGroup };

export default class CustomSelect extends React.PureComponent<IProps> {
  render() {
    const { children, ...rest } = this.props;
    return (
      <div className={styles.selectContainer}>
        <Select
          dropdownClassName={styles.selectDropDownMenuContainer}
          showArrow={false}
          defaultActiveFirstOption={false}
          getPopupContainer={(triggerNode) => triggerNode.parentElement as HTMLElement}
          {...rest}
        >
          {children}
        </Select>
        <span className="decorate" />
      </div>
    );
  }
}
