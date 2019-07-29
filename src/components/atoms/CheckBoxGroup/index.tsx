import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import styles from './styles.less';

interface IProps extends CheckboxGroupProps {}
export default class CheckboxGroup extends React.PureComponent<IProps> {
  render() {
    return <Checkbox.Group {...this.props} className={styles.customCheckboxGroup} />;
  }
}
