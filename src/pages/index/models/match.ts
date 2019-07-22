/* eslint-disable no-param-reassign, camelcase */
import _ from 'lodash';
import moment from 'moment';
import Api from '../../../service/request/api';
import { DvaModel } from '../../../common/interfaces/model';
import * as DataType from '../../../common/interfaces/dataType';
import { PAGE_NAMESPACE, ActionType, MatchType, GameType } from '../constants';

// 根据game_type进行分组
// [...] => {dota2:[...]}
function groupByGameType(data: []) {
  return _.groupBy(data, 'game_type');
}

// 根据联赛ID和日期进行分组
function groupByLeagueIdAndStartTime(match: DataType.UpcommingMatchInfo[]) {
  const groupByLeagueId = _.groupBy(match, 'league_id');
  const groupByDate: any = {};
  Object.keys(groupByLeagueId).forEach((key) => {
    groupByDate[key] = _.groupBy(groupByLeagueId[key], (item) => {
      return moment.unix(item.start_time).date();
    });
  });
  return groupByDate;
}
// 统计联赛
function summedByLeagueId(match: DataType.UpcommingMatchInfo[]) {
  const data: any = {};
  const groupByGameType = _.groupBy(match, 'game_type');
  Object.keys(groupByGameType).forEach((gameType) => {
    const leaguesInGameType = groupByGameType[gameType];
    const groupByLeagueId = _.groupBy(leaguesInGameType, 'league_id');
    data[gameType] = Object.keys(groupByLeagueId).map((key) => {
      const leagueInfo: any = _.pick(groupByLeagueId[key][0], [
        'league_id',
        'league_name',
        'league_img_url',
        'game_type'
      ]);
      leagueInfo.count = groupByLeagueId[key].length;
      return leagueInfo;
    });
  });
  return data;
}

function groupMatches(match: []) {
  const dataForMatchTable = groupByLeagueIdAndStartTime(match);
  const dataForSelectedLeagues = summedByLeagueId(match);
  console.log(dataForSelectedLeagues);
  return {
    // UCGroup,
    // UCLeagues,
    dataForMatchTable,
    dataForSelectedLeagues
  };
}

interface IState {
  upcomingList: DataType.UpcommingMatchInfo[]; // 获取到的预告列表
  dataForMatchTable: any; // 由预告列表改造
  dataForSelectedLeagues: any; // 由预告列表改造
  resultList: [];
  dResultList: [];
  resultLeagueList: [];
  currentSelectedLeaguesId: number[]; // 当前已选联赛ID
  currentGameType: GameType[]; // 当前游戏类型
  currentMatchType: MatchType; // 当前比赛类型
  currentDate: {
    [MatchType.predict]: number;
    [MatchType.result]: number;
  }; // 当前日期
}

const model: DvaModel<IState> = {
  namespace: PAGE_NAMESPACE.MATCH,
  state: {
    upcomingList: [],
    currentGameType: [GameType.dota2],
    currentMatchType: MatchType.predict,
    currentDate: {
      [MatchType.predict]: moment().date(),
      [MatchType.result]: moment().date()
    },
    currentSelectedLeaguesId: [],
    dataForSelectedLeagues: {
      [GameType.dota2]: [],
      [GameType.lol]: [],
      [GameType.csgo]: []
    },
    dataForMatchTable: {},

    resultList: [],
    dResultList: [],
    resultLeagueList: []
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
    },
    // 改变当前日期
    [ActionType.change_current_date](state, { payload: currentDate }) {
      state.currentDate[state.currentMatchType] = Number(currentDate) || moment().date();
    },
    // 改变游戏类型
    [ActionType.change_current_game_type](state, { payload: gameType }) {
      if (state.currentGameType.includes(gameType)) {
        state.currentGameType = state.currentGameType.filter((key) => key !== gameType);
        // 游戏类型是减少的时候，需要修改currentSelectedLeaguesId(过滤掉要取消的游戏类型的leagueID)
        state.currentSelectedLeaguesId = state.currentSelectedLeaguesId.filter((leagueId) => {
          return state.dataForSelectedLeagues[gameType].every(
            (item: DataType.UpcommingMatchInfo) => item.league_id !== leagueId
          );
        });
      } else {
        state.currentGameType.push(gameType);
      }
    },
    // 改变比赛类型
    [ActionType.change_current_match_type](state, { payload: matchType }) {
      state.currentMatchType = matchType;
    },
    // 改变已选联赛
    [ActionType.change_current_slected_leagueId](
      state,
      { payload: { leagueId = null, isCheckAll = null, allLeagueId = [] } }
    ) {
      // 是否全选
      if (isCheckAll === true) {
        state.currentSelectedLeaguesId = allLeagueId;
        return;
      } else if (isCheckAll === false) {
        state.currentSelectedLeaguesId = [];
        return;
      }

      // 是否选中
      if (leagueId) {
        if (state.currentSelectedLeaguesId.includes(leagueId)) {
          state.currentSelectedLeaguesId = state.currentSelectedLeaguesId.filter(
            (key) => key !== leagueId
          );
        } else {
          state.currentSelectedLeaguesId.push(leagueId);
        }
      }
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
