import { NAMESPACE } from '../../common/constant';

export const namespace = NAMESPACE.HOME;

export const ActionType = {
  // 触发reducer的。以_r结尾
  change_banners: 'change_banners_r',
  change_predict: 'change_predict_r',
  change_live_list: 'change_live_list_r',
  change_upcomming_list: 'change_upcomming_list_r',

  get_banners: 'get_banners',
  get_predict: 'get_predict',
  get_live_list: 'get_live_list',
  get_upcomming_list: 'get_upcomming_list',

  change_banners_with_namespace: `${namespace}/change_banners_r`,
  change_predict_with_namespace: `${namespace}/change_predict_r`,
  change_live_list_with_namespace: `${namespace}/change_live_list_r`,
  change_upcomming_list_with_namespace: `${namespace}/change_upcomming_list_r`,

  get_banners_with_namespace: `${namespace}/get_banners`,
  get_predict_with_namespace: `${namespace}/get_predict`,
  get_live_list_with_namespace: `${namespace}/get_live_list`,
  get_upcomming_list_with_namespace: `${namespace}/get_upcomming_list`
};
