import { NAMESPACE } from '../common/constants';
const GLOBAL = NAMESPACE.GLOBAL;
const AUTH = NAMESPACE.AUTH;
export const ActionType = {
  // global相关
  change_game_type_r: 'change_game_type_r',
  change_modal_r: 'change_modal_r',

  change_game_type_r_with_namespace: `${GLOBAL}/change_game_type_r`,
  change_modal_r_with_namespace: `${GLOBAL}/change_modal_r`,

  // auth相关
  do_login: 'do_login',
  do_login_success_r: 'do_login_success_r',
  do_login_with_namespace: `${AUTH}/do_login`,
  do_login_success_r_with_namespace: `${AUTH}/do_login_success_r`
};
