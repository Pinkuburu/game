/* eslint-disable no-param-reassign, camelcase */
import Api from '../../../service/request/api';
import { DvaModel } from '../../../common/interfaces/model';

import { PAGE_NAMESPACE, ActionType } from '../constants';

interface IState {
  banners: [];
  predict: {};
  live_list: {};
}

const model: DvaModel<IState> = {
  namespace: PAGE_NAMESPACE.HOME,
  state: {
    banners: [],
    predict: {},
    live_list: {}
  },
  reducers: {
    [ActionType.change_banners](state, { payload: banners }) {
      return {
        ...state,
        banners
      };
    },
    [ActionType.change_predict](state, { payload: predict }) {
      return {
        ...state,
        predict
      };
    },
    [ActionType.change_live_list](state, { payload: live_list }) {
      return {
        ...state,
        live_list
      };
    }
  },
  effects: {
    // 获取轮播图
    * [ActionType.get_banners](_action, { put, call }) {
      try {
        const data = yield call(Api.getSlider);
        yield put({
          type: ActionType.change_banners,
          payload: data
        });
      } catch (error) {
        console.log(error);
      }
    },
    * [ActionType.get_predict](_action, { put, call }) {
      const data = yield call(Api.getTodayPredict);
      yield put({
        type: ActionType.change_predict,
        payload: data
      });
    },
    * [ActionType.get_live_list](_action, { put, call }) {
      const data = yield call(Api.getLiveList);
      yield put({
        type: ActionType.change_live_list,
        payload: data
      });
    }
  },
  subscriptions: {
    setup({ history }) {
      history.listen((location) => {
        if (location.pathname.includes('/')) {
          console.log('进入首页');
        }
      });
    }
  }
};

export default model;
