/* eslint-disable no-param-reassign, camelcase */
import _ from 'lodash';
import Api from '../../../service/request/api';
import { DvaModel } from '../../../common/interfaces/model';

import { PAGE_NAMESPACE, ActionType } from '../constants';

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
  upcomingList: [];
  UCGroup: {};
  UCLeagues: {};
  resultList: [];
  dResultList: [];
  resultLeagueList: [];
  gameType: number;
}

const model: DvaModel<IState> = {
  namespace: PAGE_NAMESPACE.MATCH,
  state: {
    upcomingList: [],
    UCGroup: {},
    UCLeagues: {
      dota2: [],
      csgo: [],
      lol: []
    },
    resultList: [],
    dResultList: [],
    resultLeagueList: [],
    gameType: 0
  },
  reducers: {
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
    *[ActionType.get_upcomming_list](action, { put, call }) {
      const data = yield call(Api.getUpcommingList);
      yield put({
        type: ActionType.change_upcomming_list,
        payload: data
      });
    }
  }
};

export default model;
