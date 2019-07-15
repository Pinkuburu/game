import { NAMESPACE } from '../common/constants';
import { DvaModel } from '../common/interfaces/model';
import { ActionType } from './constants';
interface IState {
  gameType: string;
}
const model: DvaModel<IState> = {
  namespace: NAMESPACE.GLOBAL,
  state: {
    gameType: 'ALL'
  },
  reducers: {
    [ActionType.change_game_type_r](state, { payload: gameType }) {
      return {
        ...state,
        gameType
      };
    }
  }
};

export default model;
