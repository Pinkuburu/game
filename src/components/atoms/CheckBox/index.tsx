import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxProps, CheckboxGroupProps } from 'antd/lib/checkbox';
import styles from './styles.less';
const CheckboxGroup = Checkbox.Group;

interface IProps extends CheckboxProps {}

export const CustomCheckbox: React.FC<IProps> = (props) => (
  <div className={styles.customCheckbox}>
    <Checkbox {...props} />
  </div>
);

interface IIProps extends CheckboxGroupProps {}

export const CustomCheckboxGroup: React.FC<IIProps> = (props) => (
  <div className={styles.customCheckbox}>
    <CheckboxGroup {...props} />
  </div>
);
