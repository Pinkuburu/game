import React from 'react';
import styles from './styles.less';
import { connect } from 'dva';
import classnames from 'classnames';
import CloseBtn from './CloseBtn';
interface IProps {
  modal?: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ modal }: IProps) => {
  return (
    <div className={classnames(styles.modal, modal || styles.hide)}>
      <div className={styles.modalBg}>
        <CloseBtn />
        {modal}
      </div>
    </div>
  );
};

interface ConnectState {
  global: any;
}

export default connect((state: ConnectState) => ({
  modal: state.global.modal
}))(Modal);
