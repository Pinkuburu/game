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
  reducers: {},
  effects: {
    *[ActionType.do_login](action, { put, call }) {
      const data = yield call(Api.doLogin);
      // mobile: this.state.mob,
      // login_type: 1,
      // code: this.state.verifyCode,
      // yield put({
      //   type: ActionType.change_upcomming_list,
      //   payload: data
      // });
    }
  },
  subscriptions: {}
};
export default model;
