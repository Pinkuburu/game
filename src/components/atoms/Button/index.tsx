import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';

interface IProps {
  type?: 'Primary' | 'Default';
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const Button: React.FC<IProps> = ({
  disabled,
  children,
  className,
  onClick,
  type = 'Primary'
}: IProps) => (
  <button
    className={classnames(
      styles.buttonDefault,
      { [styles.buttonPrimary]: type === 'Primary' },
      className
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
