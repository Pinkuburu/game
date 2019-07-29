import { NAMESPACE } from '../common/constants';
export { NAMESPACE };
export const ActionType = {
  // global相关
  change_game_type_r: 'change_game_type_r',
  change_modal_r: 'change_modal_r',

  // auth相关
  do_login: 'do_login',
  do_register: 'do_register',
  do_reset_password: 'do_reset_password',
  check_for_forget: 'check_for_forget',
  send_sms_code: 'send_sms_code',
  get_user_info: 'get_user_info',

  do_logout_r: 'do_logout_r',
  get_user_info_success_r: 'get_user_info_success_r'
};
