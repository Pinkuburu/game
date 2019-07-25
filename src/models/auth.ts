import { NAMESPACE } from '../common/constants';
import { DvaModel } from '../common/interfaces/model';
import { ActionType } from './constants';
import Api from '../service/request/api';

interface IState {
  isLogined: boolean;
}
const model: DvaModel<IState> = {
  namespace: NAMESPACE.AUTH,
  state: {
    isLogined: false
  },
  reducers: {
    [ActionType.do_login_success_r](state, action) {
      return {
        ...state,
        isLogined: true
      };
    }
  },
  effects: {
    *[ActionType.do_login]({ payload: { GTVerify, ...data } }, { put, call }) {
      console.log(data);
      try {
        const res = yield call(Api.doLogin, data);
        yield put({
          type: ActionType.do_login_success_r
        });
      } catch (e) {
        GTVerify && GTVerify.resetGTVerify();
      }
    }
  },
  subscriptions: {}
};
export default model;
