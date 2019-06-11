export default {
  namespace: 'global',
  state: {
    gameType: 'ALL'
  },
  reducers: {
    'selectType'(state, { payload: gameType }) {
      return {
        ...state,
        gameType,
      };
    }
  }
}