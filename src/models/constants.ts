import { NAMESPACE } from '../common/constants';
const GLOBAL = NAMESPACE.GLOBAL;
export const ActionType = {
  // global相关
  change_game_type_r: 'change_game_type_r',
  change_modal_r: 'change_modal_r',

  change_game_type_r_with_namespace: `${GLOBAL}/change_game_type_r`,
  change_modal_r_with_namespace: `${GLOBAL}/change_modal_r`
};
