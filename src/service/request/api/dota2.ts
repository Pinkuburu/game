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
  getOddsStatisticsForDota2: () => request(concatUrl('/league/v1/odds_winrate')), // 获取指数统计
  getLeagueInfoForDota2: (leagueId: number) => request(concatUrl(`/league/v1/info/${leagueId}`)), // 联赛基础信息
  getLeagueSchedulesForDota2: (zoneId: number) =>
    request(concatUrl(`/league/v1/partition_schedule/${zoneId}`)), // 联赛赛程
  getLeagueRulesForDota2: (zoneId: number) =>
    request(concatUrl(`/league/v1/partition_rule/${zoneId}`)), // 联赛规则
  getLeagueBracketForDota2: (zoneId: number) =>
    request(concatUrl(`/league/v1/partitions_bracket/${zoneId}`)), // 联赛对阵图
  getLeaguePartitionForDota2: (zoneId: number) =>
    request(concatUrl(`/league/v1/partitions/${zoneId}`)), // 联赛统计
  getLeagueOddsWinrateForDota2: (zoneId: number) =>
    request(concatUrl(`/league/v1/partition_odds_winrate/${zoneId}`)), // 联赛指数
  getLeagueSpecialDataForDota2: (zoneId: number) =>
    request(concatUrl(`/league/v1/partition_special_data/${zoneId}`)) // 联赛特殊数据
};
