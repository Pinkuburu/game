/* eslint-disabled no-param-reassign */
import { GameTypeEnum } from '../common/enums';
import { DvaModel } from '../common/interfaces/model';
import { ActionType } from './constants';
import { tryLoginIfNeedLogin } from '../utils';
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
    [ActionType.change_game_type](state, { payload: gameType }) {
      return { ...state, gameType };
    },
    [ActionType.change_modal](state, { payload: modal }) {
      return { ...state, modal };
    }
  },
  subscriptions: {
    setup({ history }) {
      history.listen((location) => {
        if (location.pathname.includes('/')) {
          tryLoginIfNeedLogin();
        }
      });
    }
  }
};

export default model;
