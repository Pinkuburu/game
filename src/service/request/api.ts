import request from './request';

export default {
  getSlider: () => request('hawkeyepc/v1/banner'),
  getTodayPredict: () => request('hawkeyepc/v1/guess/today_guess'), // 获取今日赛程预测
  liveList: () => request('hawkeyepc/v1/match/lives_list'),
  getUpcommingList: () => request('hawkeyepc/v1/match/upcoming_leagues_list'),
  resultList: () => request('hawkeyepc/v1/match/result_list')
};
