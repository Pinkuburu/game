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
  team_id: number;
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

// 即将到来的比赛
export interface UpcommingMatchInfo {
  best_of: number;
  game_type: string;
  is_count_team_score: number;
  is_forecast: number;
  is_live: number;
  is_lock_scores: number;
  is_lock_status: number;
  league_cn_name: string;
  league_id: number;
  league_img_url: string;
  league_name: string;
  live_url: LiveUrl;
  match_id: number;
  name: string;
  odds: Odd[];
  opponents: {
    team_a_info: TeamInfoOfPredictResult;
    team_b_info: TeamInfoOfPredictResult;
  };
  scores: { score: number; team_id: number }[];
  serie_id: number;
  start_time: number;
  end_time?: number;
  game_title?: string;
  live_platform?: string;
  pull_live_streaming_url?: string;
  stage_name?: string;
  team_a_id: number;
  team_b_id: number;
  winner_id: number;
}

// 直播列表
export interface LiveUrl {
  douyu_url: string;
  huomao_url: string;
  huya_url: string;
  twitch_url: string;
}

// 指数
export interface Odd {
  gg_bet: number;
  ljj: number;
  sb: number;
}
