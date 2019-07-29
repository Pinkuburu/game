import { DvaModel } from '../common/interfaces/model';
import { ActionType } from './constants';
import { globalCloseModal } from '../utils';
import { Storage, StorageKey } from '../utils/storage';
import { globalMessage } from '../utils/';
import * as DataType from '../common/interfaces/dataType';
import Api from '../service/request/api';

interface IState {
  isLogined: boolean;
  userInfo: DataType.UserInfo;
  userMemberInfo: any[];
}
const model: DvaModel<IState> = {
  state: { isLogined: false, userInfo: { avatar: '', name: '', uid: 0 }, userMemberInfo: [] },
  reducers: {
    // 获取用户信息成功。即登录成功
    [ActionType.get_user_info_success_r](
      state,
      { payload: { user_info: userInfo, user_member_info: userMemberInfo } }
    ) {
      return { ...state, userInfo, userMemberInfo, isLogined: true };
    },
    // 登出
    [ActionType.do_logout_r](state, action) {
      Storage.remove(StorageKey.REFRESH_TOKEN);
      globalMessage('登出成功', 'success');
      return { isLogined: false, userInfo: { avatar: '', name: '', uid: 0 }, userMemberInfo: [] };
    }
  },
  effects: {
    // 登录
    // TODO:记住密码
    *[ActionType.do_login]({ payload: { onError, ...data } }, { put, call }) {
      try {
        const res = yield call(Api.doLogin, data);
        Storage.save(StorageKey.REFRESH_TOKEN, res.token);
        yield put({ type: ActionType.get_user_info });
        globalCloseModal();
      } catch (error) {
        onError && onError();
      }
    },
    // 注册
    *[ActionType.do_register]({ payload: { onError, ...data } }, { put, call }) {
      try {
        const res = yield call(Api.doRegister, data);
        Storage.save(StorageKey.REFRESH_TOKEN, res.token);
        yield put({ type: ActionType.get_user_info });
        globalCloseModal();
      } catch (error) {
        onError && onError();
      }
    },
    // 重设密码
    *[ActionType.do_reset_password]({ payload: { ...data } }, { put, call }) {
      try {
        console.log(data);
        const res = yield call(Api.doRestPassword, data);
        globalMessage('重设密码成功', 'success');
        globalCloseModal();
      } catch (error) {
        console.log('重设密码出错了', error);
      }
    },
    // 重设密码前要进行检查
    *[ActionType.check_for_forget]({ payload: { onSuccess, onError, ...data } }, { put, call }) {
      try {
        yield call(Api.checkForForget, data);
        onSuccess && onSuccess();
      } catch (error) {
        onError && onError();
      }
    },
    // 获取用户信息
    // 成功后才算登录成功
    *[ActionType.get_user_info](action, { put, call }) {
      try {
        const res = yield call(Api.getUserInfo);
        yield put({ type: ActionType.get_user_info_success_r, payload: res.data });
        globalMessage('登录成功', 'success');
      } catch (error) {
        console.log('获取用户信息出错了', error);
      }
    }
  },
  subscriptions: {}
};
export default model;
