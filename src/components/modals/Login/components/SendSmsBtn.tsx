import React from 'react';
import styles from '../styles.less';
import classnames from 'classnames';
import Button from '../../../atoms/Button';
import CustomCountDown from '../../../atoms/CountDown';

interface IProps {
  isSendSms: boolean;
  isActive: boolean;
  onCountDownEnd?: Function;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SendSmsBtn: React.FC<IProps> = ({ isActive, isSendSms, onCountDownEnd, onClick }) =>
  isSendSms ? (
    <span className={styles.reSendSMS}>
      （<CustomCountDown initTime={5} onEnd={onCountDownEnd} />
      秒后重新发送）
    </span>
  ) : (
    <Button
      type="Default"
      className={classnames(styles.sendSMS, { [styles.sendSMSS]: isActive })}
      onClick={onClick}
    >
      获取验证码
    </Button>
  );

export default SendSmsBtn;
