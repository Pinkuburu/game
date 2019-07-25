import { DvaModel } from '../common/interfaces/model';
import { ActionType } from './constants';
import { globalCloseModal } from '../utils';
import { Storage, StorageKey } from '../utils/storage';
import Api from '../service/request/api';

interface IState {
  isLogined: boolean;
}
const model: DvaModel<IState> = {
  state: { isLogined: false },
  reducers: {
    // 登录成功
    [ActionType.do_login_success_r](state, action) {
      return { ...state, isLogined: true };
    }
  },
  effects: {
    // 登录
    *[ActionType.do_login]({ payload: { GTVerify, ...data } }, { put, call }) {
      console.log(data);
      try {
        const res = yield call(Api.doLogin, data);
        Storage.save(StorageKey.REFRESH_TOKEN, res.token);
        yield put({ type: ActionType.do_login_success_r });
        globalCloseModal();
      } catch (e) {
        GTVerify && GTVerify.resetGTVerify();
      }
    },
    // 注册
    *[ActionType.do_register]({ payload: { GTVerify, ...data } }, { put, call }) {
      console.log(data);
      try {
        const res = yield call(Api.doRegister, data);
        Storage.save(StorageKey.REFRESH_TOKEN, res.token);
        yield put({ type: ActionType.do_login_success_r });
        globalCloseModal();
      } catch (e) {
        GTVerify && GTVerify.resetGTVerify();
      }
    },
    // 重设密码
    *[ActionType.do_reset_password]({ payload: { data } }, { put, call }) {
      console.log(data);
      const res = yield call(Api.doRestPassword, data);
      globalCloseModal();
      // yield put({ type: ActionType.do_login_success_r });
    },
    // 忘记密码前要进行检查
    *[ActionType.check_for_forget]({ payload: { data } }, { put, call }) {
      console.log(data);
      const res = yield call(Api.doRestPassword, data);
      yield put({ type: ActionType.do_login_success_r });
    }
  },
  subscriptions: {}
};
export default model;
