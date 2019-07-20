/* eslint-disable no-param-reassign, camelcase */
import _ from 'lodash';
// import moment from 'moment';
import Api from '../../../service/request/api';
import { DvaModel } from '../../../common/interfaces/model';
import * as DataType from '../../../common/interfaces/dataType';
import { PAGE_NAMESPACE, ActionType } from '../constants';

// 根据game_type进行分组
// [...] => {dota2:[...]}
function groupByGameType(data: []) {
  return _.groupBy(data, 'game_type');
}
// 根据league_id进行分组
// {dota2:[...]} => {dota2:{1234:[...]}}
function groupByLeagueId(data: any) {
  const newData: any = {};
  Object.keys(data).forEach((key) => {
    newData[key] = _.groupBy(data[key], 'league_id');
  });
  return newData;
}

// 对{dota2:{1234:[...]}} 中的1234:[...]进行统计总数
// {dota2:{1234:[...]}} => {dota2:[...]}
function summedUCGroup(data: any) {
  const newData: any = {};
  Object.keys(data).forEach((key) => {
    const leagueSet = Object.values(data[key]).map((leagues: any) => {
      const league: any = _.pick(leagues[0], [
        'league_id',
        'league_name',
        'league_img_url',
        'game_type'
      ]);
      league.count = leagues.length;
      return league;
    });
    newData[key] = leagueSet;
  });
  return newData;
}

// 按某些字段进行分类
// function groupByStr(match: DataType.UpcommingMatchInfo[]) {
//   const data: any = {};
//   // 按照联赛ID进行分类
//   data.groupByLeagueId = _.groupBy(match, 'league_id');
//   // 按照开始时间是周几进行分类
//   data.groupByStartTime = _.groupBy(match, (item) => {
//     return moment.unix(item.start_time).day();
//   });
//   // 对同一联赛ID的进行统计
//   data.summedByLeagueId = Object.keys(data.groupByLeagueId).map((leagueId:any)=>{
//     data.groupByLeagueId.leagueId[0]
//   })
//   console.log(data);
// }

function groupMatches(match: []) {
  const groupData = groupByGameType(match);
  const UCGroup = groupByLeagueId(groupData);
  const UCLeagues = summedUCGroup(UCGroup);
  // Object.values(groupData).forEach((item) => groupByStr(item));
  return {
    UCGroup,
    UCLeagues
  };
}

interface IState {
  upcomingList: DataType.UpcommingMatchInfo[];
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
    UCGroup: {
      dota2: {},
      csgo: {},
      lol: {}
    },
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
    * [ActionType.get_upcomming_list](action, { put, call }) {
      const data = yield call(Api.getUpcommingList);
      yield put({
        type: ActionType.change_upcomming_list,
        payload: data
      });
    }
  }
};

export default model;
