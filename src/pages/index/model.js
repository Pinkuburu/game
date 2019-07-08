/* eslint-disable import/no-extraneous-dependencies,import/no-duplicates */
import _ from 'lodash';
import { getSlider, todayPredict, liveList, getUpcommingList } from '../../service/api';

function groupMatches(match) {
  const groupData = _.groupBy(match, 'game_type');
  const UCGroup = {};
  const UCLeagues = {};
  // eslint-disable-next-line no-return-assign
  Object.keys(groupData).forEach(key => UCGroup[key] = _.groupBy(groupData[key], 'league_id'));
  Object.keys(UCGroup).forEach((key) => {
    const leagueSet = Object.values(UCGroup[key]).map((leagues) => {
      const league = _.pick(leagues[0], ['league_id', 'league_name', 'league_img_url', 'game_type']);
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
    // eslint-disable-next-line camelcase
    live_list(state, { payload: live_list }) {
      return {
        ...state,
        live_list
      };
    },
    upcommingList(state, { payload: upcommingList }) {
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
    * getSlider(action, { put }) {
      const data = yield getSlider();
      yield put({
        type: 'banners',
        payload: data.data
      });
    },
    * getPredict(action, { put }) {
      const data = yield todayPredict();
      yield put({
        type: 'predict',
        payload: data.data
      });
    },
    * getLiveList(action, { put }) {
      const data = yield liveList();
      yield put({
        type: 'live_list',
        payload: data.data
      });
    },
    * getupcommingList(action, { put }) {
      const data = yield getUpcommingList();
      yield put({
        type: 'getUpcommingList',
        payload: data.data
      });
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'getSlider' });
      dispatch({ type: 'getPredict' });
      dispatch({ type: 'getLiveList' });
      dispatch({ type: 'getupcommingList' });
    }
  }
};
