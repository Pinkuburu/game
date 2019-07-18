import { GameTypeEnum } from '../enums/index';
// 今日赛事预测
export interface PredictOfToday {
  list: PredictResult[];
  total: StatisticalPredictResult;
}
// 赛事预测结果
export interface PredictResult {
  best_of: number;
  content: string;
  game_type: GameTypeEnum;
  id: number;
  is_member: boolean;
  match_id: number;
  odds: string;
  recommend_type: number;
  result: string;
  // todo:时间戳格式可能需要另外定义
  start_time: number;
  team_a_id: number;
  team_a_info: TeamInfoOfPredictResult;
  team_b_id: number;
  team_b_info: TeamInfoOfPredictResult;
}
// 统计赛事预测结果
export interface StatisticalPredictResult {
  finish_match: number;
  rate_of_return: number;
  success_scene: number;
  total_scene: number;
  win_rate: number;
}

// 赛事预测中的队伍信息
export interface TeamInfoOfPredictResult {
  name: string;
  tag: string;
  custom_logo: string;
}

// 首页轮播图
export interface BannersImg {
  description: string;
  id: number;
  img_url: string;
  is_show_switch: number;
  tar_url: string;
  weigh: number;
}

// 联赛基本信息
export interface LeagueInfo {
  league_name: string;
  league_img_url: string;
  league_id: number;
  count: number;
}
