import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import styles from './styles.less';

interface IProps extends CheckboxProps {}

// TODO: 直接修改CheckBoxGroup
export const CustomCheckbox: React.FC<IProps> = (props) => (
  <div className={styles.customCheckbox}>
    <Checkbox {...props} />
  </div>
);
