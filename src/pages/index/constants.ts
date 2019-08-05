import { NAMESPACE } from '@/common/constants';
import { MatchType } from '@/common/enums';
export { MatchType };
export { NAMESPACE };

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
  get_upcomming_list: 'get_upcomming_list'
};
