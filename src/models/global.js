import { NAMESPACE } from '../common/constant';
export default {
  namespace: NAMESPACE.GLOBAL,
  state: {
    gameType: 'ALL'
  },
  reducers: {
    selectType(state, { payload: gameType }) {
      return {
        ...state,
        gameType
      };
    }
  }
};
