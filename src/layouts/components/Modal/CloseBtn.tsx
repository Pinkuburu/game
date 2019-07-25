import React from 'react';
import styles from './styles.less';
import { ActionType } from '../../../models/constants';
import { globalDispatch } from '../../../utils';

function close() {
  globalDispatch({
    type: ActionType.change_modal_r_with_namespace,
    payload: null
  });
}

const CloseBtn: React.FC = () => {
  return <span className={styles.closeBtn} onClick={close} />;
};

export default CloseBtn;
