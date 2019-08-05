import { DvaModel } from '@/common/interfaces/model';
import { globalCloseModal } from '@/utils';
import { Storage, StorageKey } from '@/utils/storage';
import { globalMessage } from '@/utils/';
import * as DataType from '@/common/interfaces/dataType';
import Api from '@/service/request/api';
import { PayWayEnum } from '@/common/enums';
import { ActionType } from './constants';

interface IState {
  isLogined: boolean;
  userInfo: DataType.UserInfo;
  userMemberInfo: DataType.UserMemberInfo[];
}
const model: DvaModel<IState> = {
  state: {
    isLogined: false,
    userInfo: { avatar: '', name: '', mobile: '', uid: 0 },
    userMemberInfo: []
  },
  reducers: {
    // 获取用户信息成功。即登录成功
    [ActionType.get_user_info_success](
      state,
      { payload: { user_info: userInfo, user_member_info: userMemberInfo } }
    ) {
      return { ...state, userInfo, userMemberInfo, isLogined: true };
    },
    // 登出
    [ActionType.do_logout](state, action) {
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
        globalMessage('登录成功', 'success');
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
        yield put({ type: ActionType.get_user_info_success, payload: res.data });
      } catch (error) {
        console.log('获取用户信息出错了', error);
      }
    },
    // 开通会员
    *[ActionType.do_open_membership](
      { payload: { type, onGenerateWechatOrderSuccess, ...data } },
      { put, call }
    ) {
      try {
        let res: any;
        switch (type as PayWayEnum) {
          case PayWayEnum.aliPay:
            res = yield call(Api.aliPay, data);
            window.open(res.pay_qrcode, '_blank');
            break;
          case PayWayEnum.wechatPay:
            res = yield call(Api.wechatPay, data);
            onGenerateWechatOrderSuccess && onGenerateWechatOrderSuccess(res.pay_qrcode);
            break;
        }
        yield call(Api.checkOrderStatus, { id: res.id });
        // 重新获取用户信息
        yield put({ type: ActionType.get_user_info });
        globalCloseModal();
      } catch (error) {
        console.log('充值会员出错了', error);
      }
    },
    // 修改个人信息
    *[ActionType.do_edit_user_info](
      {
        payload: {
          tryEditAvatarAndName,
          tryResetPassword,
          newAvatarAndNameData,
          newPasswordData,
          onSuccess
        }
      },
      { put, call, all }
    ) {
      try {
        const requestList = [];
        tryEditAvatarAndName && requestList.push(call(Api.editUserInfo, newAvatarAndNameData));
        tryResetPassword && requestList.push(call(Api.doRestPasswordWithToken, newPasswordData));
        yield all([...requestList]);
        // 重新获取用户信息
        yield put({ type: ActionType.get_user_info });
        onSuccess && onSuccess();
        globalMessage('修改信息成功', 'success');
      } catch (error) {
        console.log('修改个人信息出错了', error);
      }
    },
    // 发送反馈建议
    *[ActionType.send_feed_back]({ payload: { onSuccess, ...data } }, { put, call }) {
      try {
        yield call(Api.sendFeedback, data);
        globalMessage('提交成功', 'success');
        onSuccess && onSuccess();
      } catch (error) {
        console.log('提交成功', error);
      }
    }
  },
  subscriptions: {}
};
export default model;
