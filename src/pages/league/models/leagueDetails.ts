/* eslint-disable no-param-reassign */
import { DvaModel } from '@/common/interfaces/model';
import _ from 'lodash';
import { globalCloseModal, globalMessage } from '@/utils';
import { Storage, StorageKey } from '@/utils/storage';
import * as DataType from '@/common/interfaces/dataType';
import Api from '@/service/request/api';
import { GameTypeEnum, LeagueStatusEnum } from '@/common/enums';
import { ActionType } from '../constant';

interface IState {}

const model: DvaModel<IState> = {
  state: {},
  reducers: {
    // 获取联赛详情成功
    [ActionType.get_league_info_success_r](state, { payload: data }) {}
  },
  effects: {
    // 获取联赛详情
    *[ActionType.get_league_info]({ payload: { leagueId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueInfoForDota2, leagueId);
      } catch (error) {
        console.log('获取联赛详情出错了', error);
      }
    },
    // 获取联赛赛程
    *[ActionType.get_league_schedules]({ payload: { leagueId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueSchedulesForDota2, leagueId);
      } catch (error) {
        console.log('获取联赛赛程出错了', error);
      }
    },
    // 获取联赛规则
    *[ActionType.get_league_rules]({ payload: { leagueId } }, { put, call, select }) {
      try {
        yield call(Api.getLeagueRulesForDota2, leagueId);
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
