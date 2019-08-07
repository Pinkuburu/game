/* eslint-disable no-param-reassign */
import { DvaModel } from '@/common/interfaces/model';
import _ from 'lodash';
import moment from 'moment';
import { globalCloseModal, globalMessage } from '@/utils';
import { Storage, StorageKey } from '@/utils/storage';
import * as DataType from '@/common/interfaces/dataType';
import Api from '@/service/request/api';
import { GameTypeEnum, LeagueStatusEnum } from '@/common/enums';
import { ActionType } from '../constant';

interface IState {
  info: DataType.LeagueDetailInfo | {}; // 联赛信息
  rank: DataType.RankInfo[]; // 名次信息
  partationList: any[]; // 联赛赛区信息
  currentZoneId: string | number; // 当前赛区ID
  schedulesGroupByDate: any;
  rules: any[];
}

const model: DvaModel<IState> = {
  state: {
    info: {},
    rank: [],
    currentZoneId: 0,
    partationList: [],
    schedulesGroupByDate: {},
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
    [ActionType.get_league_schedules_success](state, { payload: data }) {
      Object.assign(state.schedulesGroupByDate, data);
    },
    // 获取联赛规则成功
    [ActionType.get_league_rules_success](state, { payload: { data = [] } }) {
      state.rules = data;
    },
    // 切换当前赛区
    [ActionType.change_current_zone_id_success](state, { payload: zoneId }) {
      state.currentZoneId = zoneId;
    }
  },
  effects: {
    // 获取联赛详情
    *[ActionType.get_league_info]({ payload: { leagueId } }, { put, call, select, all }) {
      try {
        const res: any = yield call(Api.getLeagueInfoForDota2, leagueId);
        yield put({
          type: ActionType.get_league_info_success,
          payload: { info: res.info, rank: res.rank, partationList: res.partation_list }
        });
        yield res.partation_list[0] &&
          put({ type: ActionType.change_current_zone_id, payload: res.partation_list[0].id });
      } catch (error) {
        console.log('获取联赛详情出错了', error);
      }
    },
    // 切换当前赛区
    *[ActionType.change_current_zone_id]({ payload: zoneId }, { put, call, select, all }) {
      yield put({ type: ActionType.change_current_zone_id_success, payload: zoneId });
      yield put({ type: ActionType.get_league_schedules, payload: zoneId });
    },
    // 获取联赛赛程
    *[ActionType.get_league_schedules]({ payload: zoneId }, { put, call, select }) {
      try {
        const res = yield call(Api.getLeagueSchedulesForDota2, zoneId);
        const resGroupByDate = _.groupBy(res, (item) =>
          moment.unix(item.start_time).format('MMDD')
        );
        yield put({
          type: ActionType.get_league_schedules_success,
          payload: { [zoneId]: resGroupByDate }
        });
      } catch (error) {
        console.log('获取联赛赛程出错了', error);
      }
    },
    // 获取联赛规则
    *[ActionType.get_league_rules]({ payload: { zoneId } }, { put, call, select }) {
      try {
        const res = yield call(Api.getLeagueRulesForDota2, zoneId);
        yield put({ type: ActionType.get_league_rules_success, payload: { data: res.rule } });
      } catch (error) {
        console.log('获取联赛规则出错了', error);
      }
    },
    // 获取联赛对阵图
    *[ActionType.get_league_brackets]({ payload: { zoneId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueBracketForDota2, zoneId);
      } catch (error) {
        console.log('获取联赛对阵图出错了', error);
      }
    },
    // 获取联赛统计数据
    *[ActionType.get_league_partition]({ payload: { zoneId } }, { put, call, select }) {
      try {
        yield call(Api.getLeaguePartitionForDota2, zoneId);
      } catch (error) {
        console.log('获取联赛统计数据出错了', error);
      }
    },
    // 获取联赛指数数据
    *[ActionType.get_league_odds_winrate]({ payload: { zoneId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueOddsWinrateForDota2, zoneId);
      } catch (error) {
        console.log('获取联赛指数数据出错了', error);
      }
    },
    // 获取联赛特殊数据
    *[ActionType.get_league_special_data]({ payload: { zoneId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueSpecialDataForDota2, zoneId);
      } catch (error) {
        console.log('获取联赛特殊数据出错了', error);
      }
    }
  }
};
export default model;
