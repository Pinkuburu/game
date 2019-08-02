import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';

interface IProps {
  type?: 'Primary' | 'Default';
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  loading?: boolean;
  loadingText?: string;
}

const CustomButton: React.FC<IProps> = ({
  disabled,
  children,
  className,
  onClick,
  type = 'Primary',
  loading = false,
  loadingText = '正在执行'
}: IProps) => (
  <button
    className={classnames(
      styles.buttonDefault,
      { [styles.buttonPrimary]: type === 'Primary' },
      className
    )}
    onClick={onClick}
    disabled={disabled || loading}
  >
    {loading ? loadingText : children}
  </button>
);

export default CustomButton;
