import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';

interface IProps {
  type: 'phone' | 'phoneS' | 'sms' | 'smsS' | 'password' | 'passwordS';
}

const Icon: React.FC<IProps> = ({ type }) => (
  <span className={classnames(styles.icon, styles[type])} />
);

export default Icon;
