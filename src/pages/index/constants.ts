export const PAGE_NAMESPACE = {
  HOME: 'home',
  MATCH: 'match'
};

export const ActionType = {
  // 触发reducer的。以_r结尾
  change_banners: 'change_banners_r',
  change_predict: 'change_predict_r',
  change_live_list: 'change_live_list_r',
  change_upcomming_list: 'change_upcomming_list_r',
  change_current_date: 'change_current_date_r',
  change_current_game_type: 'change_current_game_type_r',
  change_current_match_type: 'change_current_match_type_r',
  change_current_slected_leagueId: 'change_current_slected_leagueId_r',

  get_banners: 'get_banners',
  get_predict: 'get_predict',
  get_live_list: 'get_live_list',
  get_upcomming_list: 'get_upcomming_list',

  change_banners_with_namespace: `${PAGE_NAMESPACE.HOME}/change_banners_r`,
  change_predict_with_namespace: `${PAGE_NAMESPACE.HOME}/change_predict_r`,
  change_live_list_with_namespace: `${PAGE_NAMESPACE.HOME}/change_live_list_r`,
  change_upcomming_list_with_namespace: `${PAGE_NAMESPACE.MATCH}/change_upcomming_list_r`,
  change_current_date_with_namespace: `${PAGE_NAMESPACE.MATCH}/change_current_date_r`,
  change_current_game_type_with_namespace: `${PAGE_NAMESPACE.MATCH}/change_current_game_type_r`,
  change_current_match_type_with_namespace: `${PAGE_NAMESPACE.MATCH}/change_current_match_type_r`,
  change_current_slected_leagueId_with_namespace: `${
    PAGE_NAMESPACE.MATCH
  }/change_current_slected_leagueId_r`,

  get_banners_with_namespace: `${PAGE_NAMESPACE.HOME}/get_banners`,
  get_predict_with_namespace: `${PAGE_NAMESPACE.HOME}/get_predict`,
  get_live_list_with_namespace: `${PAGE_NAMESPACE.HOME}/get_live_list`,
  get_upcomming_list_with_namespace: `${PAGE_NAMESPACE.MATCH}/get_upcomming_list`
};

// 比赛类型
export enum MatchType {
  predict = 'predict',
  result = 'result'
}
// 游戏类型
export enum GameType {
  dota2 = 'dota2',
  csgo = 'csgo',
  lol = 'lol'
}
