/* eslint-disable no-param-reassign, camelcase */
import _ from 'lodash';
import { getSlider, liveList, getUpcommingList } from '../../../service/api';
import Api from '../../../service/request/api';
import { namespace, ActionType } from '../constant';

function groupMatches(match) {
  const groupData = _.groupBy(match, 'game_type');
  const UCGroup = {};
  const UCLeagues = {};
  // eslint-disable-next-line no-return-assign
  Object.keys(groupData).forEach((key) => (UCGroup[key] = _.groupBy(groupData[key], 'league_id')));
  Object.keys(UCGroup).forEach((key) => {
    const leagueSet = Object.values(UCGroup[key]).map((leagues) => {
      const league = _.pick(leagues[0], [
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

export default {
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
    resultLeagueList: [],
    yo: 1
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
    *[ActionType.get_banners](action, { put }) {
      const data = yield getSlider();
      yield put({
        type: ActionType.change_banners,
        payload: data.data
      });
    },
    *[ActionType.get_predict](action, { put }) {
      const data = yield Api.getTodayPredict();
      yield Api.getUpcommingList();
      yield put({
        type: ActionType.change_predict,
        payload: data
      });
    },
    *[ActionType.get_live_list](action, { put }) {
      const data = yield liveList();
      yield put({
        type: ActionType.change_live_list,
        payload: data.data
      });
    },
    *[ActionType.get_upcomming_list](action, { put }) {
      const data = yield getUpcommingList();
      yield put({
        type: ActionType.change_upcomming_list,
        payload: data.data
      });
    }
  },
  subscriptions: {}
};
