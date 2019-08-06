/* eslint-disable no-param-reassign */
import { DvaModel } from '@/common/interfaces/model';
import _ from 'lodash';
import { globalCloseModal, globalMessage } from '@/utils';
import { Storage, StorageKey } from '@/utils/storage';
import * as DataType from '@/common/interfaces/dataType';
import Api from '@/service/request/api';
import { GameTypeEnum, LeagueStatusEnum } from '@/common/enums';
import { ActionType } from '../constant';

interface IState {
  info: DataType.LeagueDetailInfo | {};
  rank: DataType.RankInfo[];
  partationList: any[];
  originalSchedules: any[];
  rules: any[];
}

const model: DvaModel<IState> = {
  state: {
    info: {},
    rank: [],
    originalSchedules: [],
    partationList: [],
    rules: []
  },
  reducers: {
    // 获取联赛详情成功
    [ActionType.get_league_info_success](
      state,
      { payload: { info = {}, rank = [], partationList = [] } }
    ) {
      state.info = info;
      state.rank = rank;
      state.partationList = partationList;
    },
    // 获取联赛赛程成功
    [ActionType.get_league_schedules_success](state, { payload: { data = [] } }) {
      state.originalSchedules = data;
    },
    // 获取联赛规则成功
    [ActionType.get_league_rules_success](state, { payload: { data = [] } }) {
      state.rules = data;
    }
  },
  effects: {
    // 获取联赛详情
    *[ActionType.get_league_info]({ payload: { leagueId } }, { put, call, select }) {
      try {
        const res = yield call(Api.getLeagueInfoForDota2, leagueId);
        yield put({
          type: ActionType.get_league_info_success,
          payload: { info: res.info, rank: res.rank, partationList: res.partation_list }
        });
      } catch (error) {
        console.log('获取联赛详情出错了', error);
      }
    },
    // 获取联赛赛程
    *[ActionType.get_league_schedules]({ payload: { leagueId } }, { put, call, select }) {
      try {
        const res = yield call(Api.getLeagueSchedulesForDota2, leagueId);
        yield put({ type: ActionType.get_league_schedules_success, payload: { data: res } });
      } catch (error) {
        console.log('获取联赛赛程出错了', error);
      }
    },
    // 获取联赛规则
    *[ActionType.get_league_rules]({ payload: { leagueId } }, { put, call, select }) {
      try {
        const res = yield call(Api.getLeagueRulesForDota2, leagueId);
        yield put({ type: ActionType.get_league_rules_success, payload: { data: res.rule } });
      } catch (error) {
        console.log('获取联赛规则出错了', error);
      }
    },
    // 获取联赛对阵图
    *[ActionType.get_league_brackets]({ payload: { leagueId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueBracketForDota2, leagueId);
      } catch (error) {
        console.log('获取联赛对阵图出错了', error);
      }
    },
    // 获取联赛统计数据
    *[ActionType.get_league_partition]({ payload: { leagueId } }, { put, call, select }) {
      try {
        yield call(Api.getLeaguePartitionForDota2, leagueId);
      } catch (error) {
        console.log('获取联赛统计数据出错了', error);
      }
    },
    // 获取联赛指数数据
    *[ActionType.get_league_odds_winrate]({ payload: { leagueId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueOddsWinrateForDota2, leagueId);
      } catch (error) {
        console.log('获取联赛指数数据出错了', error);
      }
    },
    // 获取联赛特殊数据
    *[ActionType.get_league_special_data]({ payload: { leagueId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueSpecialDataForDota2, leagueId);
      } catch (error) {
        console.log('获取联赛特殊数据出错了', error);
      }
    }
  }
};
export default model;
