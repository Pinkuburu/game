import React from 'react';
import styles from './styles.less';
import { ActionType, NAMESPACE } from '../../../models/constants';
import { globalDispatch } from '../../../utils';

function close() {
  globalDispatch({
    type: `${NAMESPACE.GLOBAL}/${ActionType.change_modal_r}`,
    payload: null
  });
}

const CloseBtn: React.FC = () => {
  return <span className={styles.closeBtn} onClick={close} />;
};

export default CloseBtn;
