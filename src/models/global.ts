/* eslint-disabled no-param-reassign */
import { GameTypeEnum } from '../common/enums';
import { DvaModel } from '../common/interfaces/model';
import { ActionType } from './constants';
interface IState {
  gameType: GameTypeEnum;
  modal: React.ReactNode;
}
const model: DvaModel<IState> = {
  state: {
    gameType: GameTypeEnum.ALL,
    modal: null
  },
  reducers: {
    [ActionType.change_game_type_r](state, { payload: gameType }) {
      return { ...state, gameType: Number(gameType) };
    },
    [ActionType.change_modal_r](state, { payload: modal }) {
      return { ...state, modal };
    }
  }
};

export default model;
