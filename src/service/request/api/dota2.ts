import request from '../request';
import path from '../path';
import { LeagueStatusEnum } from '@/common/enums';
import { globalMessage, globalStore, NAMESPACE, withToken } from '@/utils';

const baseUrl = path.dota2;
function concatUrl(url: string) {
  return `${baseUrl}${url}`;
}

export default {
  // =====================联赛相关
  getLeagueListForDota2: ({ status = LeagueStatusEnum.RECENT, page = 1 }) =>
    request(concatUrl('/league/v1/league_list'), { params: { status, page } }), // 获取联赛信息
  getHeroStatisticsForDota2: () => request(concatUrl('/league/v1/heros_stat')), // 获取英雄统计
  getOddsStatisticsForDota2: () => request(concatUrl('/league/v1/odds_winrate')) // 获取指数统计
};
