/* eslint-disabled no-param-reassign */
import { NAMESPACE } from '../common/constants';
import { DvaModel } from '../common/interfaces/model';
import { ActionType } from './constants';
interface IState {
  gameType: string;
  modal: React.ReactNode;
}
const model: DvaModel<IState> = {
  namespace: NAMESPACE.GLOBAL,
  state: {
    gameType: 'ALL',
    modal: null
  },
  reducers: {
    [ActionType.change_game_type_r](state, { payload: gameType }) {
      return {
        ...state,
        gameType
      };
    },
    [ActionType.change_modal_r](state, { payload: modal }) {
      return {
        ...state,
        modal
      };
    }
  }
};

export default model;
