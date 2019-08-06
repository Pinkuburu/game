import { DvaModel } from '@/common/interfaces/model';
import _ from 'lodash';
import { globalCloseModal, globalMessage } from '@/utils';
import { Storage, StorageKey } from '@/utils/storage';
import * as DataType from '@/common/interfaces/dataType';
import Api from '@/service/request/api';
import { GameTypeEnum, LeagueStatusEnum } from '@/common/enums';
import { ActionType } from '../constant';

interface IState {
  originRecentLeagueList: DataType.ClassifiedByGameType<any>;
  originDoneLeagueList: DataType.ClassifiedByGameType<any>;
  oddsStat: DataType.ClassifiedByGameType<{
    hot_oddsWinrate: any;
    odds_winrate: any[];
  }>;
  heroStat: DataType.ClassifiedByGameType<any>;
}

const model: DvaModel<IState> = {
  state: {
    originRecentLeagueList: {
      [GameTypeEnum.DOTA2]: [],
      [GameTypeEnum.LOL]: [],
      [GameTypeEnum.CSGO]: []
    },
    originDoneLeagueList: {
      [GameTypeEnum.DOTA2]: [],
      [GameTypeEnum.LOL]: [],
      [GameTypeEnum.CSGO]: []
    },
    oddsStat: {
      [GameTypeEnum.DOTA2]: {
        hot_oddsWinrate: {},
        odds_winrate: []
      },
      [GameTypeEnum.LOL]: {
        hot_oddsWinrate: {},
        odds_winrate: []
      },
      [GameTypeEnum.CSGO]: {
        hot_oddsWinrate: {},
        odds_winrate: []
      }
    },
    heroStat: {
      [GameTypeEnum.DOTA2]: {
        place_1: [],
        place_2: [],
        place_3: [],
        place_4: [],
        place_5: []
      },
      [GameTypeEnum.LOL]: {},
      [GameTypeEnum.CSGO]: {}
    }
  },
  reducers: {
    // 获取联赛信息成功
    [ActionType.get_league_list_success](state, { payload: { status, result, type } }) {
      switch (status as LeagueStatusEnum) {
        case LeagueStatusEnum.RECENT:
          state.originRecentLeagueList[type as GameTypeEnum.CSGO].push(...result);
          break;
        case LeagueStatusEnum.DONE:
          state.originDoneLeagueList[type as GameTypeEnum.CSGO].push(...result);
          break;
      }
    },
    // 获取指数统计成功
    [ActionType.get_odds_stat_success](state, { payload: { result } }) {
      Object.assign(state.oddsStat, result);
    },
    // 获取英雄统计成功
    [ActionType.get_hero_stat_success](state, { payload: { result } }) {
      Object.assign(state.heroStat, result);
    }
  },
  effects: {
    // 获取列赛信息
    *[ActionType.get_league_list](
      { payload: { type, status, onSuccess, ...data } },
      { put, call }
    ) {
      console.log(data);
      try {
        let result = [];
        switch (type as GameTypeEnum) {
          case GameTypeEnum.DOTA2:
            {
              const dota2res: DataType.TableData<any> = yield call(Api.getLeagueListForDota2, {
                status,
                ...data
              });
              result = dota2res.data || [];
              onSuccess && onSuccess(result.length || 0);
            }
            break;
        }

        yield put({ type: ActionType.get_league_list_success, payload: { result, status, type } });
      } catch (error) {
        onSuccess && onSuccess(0);
        console.log('获取联赛信息出错了', error);
      }
    },
    // 获取英雄统计
    *[ActionType.get_hero_stat]({ payload: { type } }, { put, call }) {
      try {
        const result: any = {};
        switch (type as GameTypeEnum) {
          case GameTypeEnum.DOTA2:
            {
              const dota2res = yield call(Api.getHeroStatisticsForDota2);
              result[GameTypeEnum.DOTA2] = dota2res;
            }
            break;
        }
        yield put({ type: ActionType.get_hero_stat_success, payload: { result } });
      } catch (error) {
        console.log('获取英雄统计出错了', error);
      }
    }, // 获取指数统计
    *[ActionType.get_odds_stat]({ payload: { type } }, { put, call }) {
      try {
        const result: any = {};
        switch (type as GameTypeEnum) {
          case GameTypeEnum.DOTA2:
            {
              const dota2res = yield call(Api.getOddsStatisticsForDota2);
              result[GameTypeEnum.DOTA2] = dota2res;
            }
            break;
        }
        yield put({ type: ActionType.get_odds_stat_success, payload: { result } });
      } catch (error) {
        console.log('获取指数统计出错了', error);
      }
    }
  },
  subscriptions: {}
};
export default model;
