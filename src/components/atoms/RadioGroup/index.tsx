import React from 'react';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';
import styles from './styles.less';

interface IProps extends RadioGroupProps {}
export default class CustomRadioGroup extends React.PureComponent<IProps> {
  render() {
    return <Radio.Group {...this.props} className={styles.customRadioGroup} size="large" />;
  }
}
