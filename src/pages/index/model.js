import { getSlider, todayPredict, liveList, upcommingList } from '../../service/api';

export default {
  state: {
    banners: [],
    predict: {},
    live_list: {},
    upcommingList: [],
  },
  reducers: {
    banners(state, { payload: banners }) {
      return {
        ...state,
        banners
      };
    },
    predict(state, { payload: predict }) {
      return {
        ...state,
        predict
      };
    },
    live_list(state, { payload: live_list }) {
      console.log('进入到了live_list', live_list)
      return {
        ...state,
        live_list,
      };
    },
    upcomingLeagues(state, { payload: upcommingList }) {
      return {
        ...state,
        upcommingList,
      };
    }
  },
  effects: {
    *getSlider(_, { call, put }) {
      const data = yield getSlider();
      yield put({
        type: 'banners',
        payload: data.data,
      });
    },
    *getPredict(_, { call, put }) {
      const data = yield todayPredict();
      yield put({
        type: 'predict',
        payload: data.data,
      });
    },
    *getLiveList(_, { put }) {
      const data = yield liveList();
      yield put({
        type: 'live_list',
        payload: data.data
      })
    },
    *getUpcomingLeagues(_, { put }) {
      const data = yield upcommingList();
      // console.log('赛事预告滚滚滚', data);
      yield put({
        type: 'upcomingLeagues',
        payload: data.data,
      })
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'getSlider' });
      dispatch({ type: 'getPredict' });
      dispatch({ type: 'getLiveList' });
      dispatch({ type: 'getUpcomingLeagues' })
    }
  }
}