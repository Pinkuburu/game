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
  team_a_info: TeamInfoOfPredictResult;
  team_b_info: TeamInfoOfPredictResult;
  scores: { score: number; team_id: number }[];
  serie_id: number;
  start_time: number;
  end_time?: number;
  game_title?: string;
  live_platform?: string;
  pull_live_streaming_url?: string;
  stage_name?: string;
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

// 用户信息
export interface UserInfo {
  avatar: string;
  name: string;
  uid: number;
  mobile: string;
}
// 用户会员信息
export interface UserMemberInfo {
  expire: number;
  member_product_type_id: number;
}

// 表格信息
export interface TableData<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}

// 联赛详细信息
export interface LeagueDetailInfo {
  description: string;
  douyu_url: string;
  end_time: number;
  huomao_url: string;
  huya_url: string;
  id: number;
  img_urls: {
    img_desc_back: string;
    img_desc_logo: string;
    img_list_logo: string;
  };
  match_city: string;
  name: string;
  organizer: string;
  prize_money: string;
  start_time: number;
  status: number;
  team_nums: number;
  tier: string;
  twitch_url: string;
}

// 名次得主
export interface RankInfo {
  bonus: string;
  name: string;
  team_id: number;
  team_info: {
    country_code: string;
    custom_logo: string;
    division: string;
    logo: string;
    name: string;
    rank: number;
    tag: string;
    team_id: number;
    world_rank: number;
  };
}

// 英雄统计
export interface HeroStat {
  hero_id: number;
  name: {
    id: number;
    name: string;
    name_cn: string;
    img: string;
  };
  nums: number;
  place: number;
  reverse_nums: number;
  reverse_wins: number;
  stomp_nums: number;
  stomp_wins: number;
  wins: number;
}

// 指数统计
export interface OddsStatForWin {
  nums: number;
  odds: string;
  type: GameTypeEnum;
  winper: number;
  wins: number;
}
// 热门指数
export interface OddsStatForHot {
  total_nums: number;
  win_nums: number;
}

// 常用的以游戏类型分类的数据结构
export interface ClassifiedByGameType<T> {
  [GameTypeEnum.DOTA2]: T;
  [GameTypeEnum.LOL]: T;
  [GameTypeEnum.CSGO]: T;
}

// 分区基本信息
export interface PartationItem {
  id: number;
  name: string;
  sort: number;
}
