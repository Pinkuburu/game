/* eslint-disable no-param-reassign, camelcase */
import _ from 'lodash';
import Api from '../../../service/request/api';
import { DvaModel } from '../../../common/interfaces/model';

import { namespace, ActionType } from '../constants';

function groupMatches(match: []) {
  const groupData = _.groupBy(match, 'game_type');
  const UCGroup: any = {};
  const UCLeagues: any = {};
  Object.keys(groupData).forEach((key) => {
    UCGroup[key] = _.groupBy(groupData[key], 'league_id');
  });
  Object.keys(UCGroup).forEach((key) => {
    const leagueSet = Object.values(UCGroup[key]).map((leagues: any) => {
      const league: any = _.pick(leagues[0], [
        'league_id',
        'league_name',
        'league_img_url',
        'game_type'
      ]);
      league.count = leagues.length;
      return league;
    });
    UCLeagues[key] = leagueSet;
  });
  return {
    UCGroup,
    UCLeagues
  };
}
interface IState {
  banners: [];
  predict: {};
  live_list: {};
  upcomingList: [];
  UCGroup: {};
  UCLeagues: {};
  resultList: [];
  dResultList: [];
  resultLeagueList: [];
}
const model: DvaModel<IState> = {
  namespace,
  state: {
    banners: [],
    predict: {},
    live_list: {},
    upcomingList: [],
    UCGroup: {},
    UCLeagues: {},
    resultList: [],
    dResultList: [],
    resultLeagueList: []
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
    },
    [ActionType.change_upcomming_list](state, { payload: upcommingList }) {
      // const upcomingLeagueList = getLeagueList(getUpcommingList);
      const Sets = groupMatches(upcommingList);
      return {
        ...state,
        upcommingList,
        ...Sets
      };
    }
  },
  effects: {
    *[ActionType.get_banners](action, { put, call }) {
      const data = yield call(Api.getSlider);
      yield put({
        type: ActionType.change_banners,
        payload: data
      });
    },
    *[ActionType.get_predict](action, { put, call }) {
      const data = yield call(Api.getTodayPredict);
      yield put({
        type: ActionType.change_predict,
        payload: data
      });
    },
    *[ActionType.get_live_list](action, { put, call }) {
      const data = yield call(Api.getLiveList);
      yield put({
        type: ActionType.change_live_list,
        payload: data
      });
    },
    *[ActionType.get_upcomming_list](action, { put, call }) {
      const data = yield call(Api.getUpcommingList);
      yield put({
        type: ActionType.change_upcomming_list,
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
