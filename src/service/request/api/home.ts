import request from '../request';
import { Storage, StorageKey } from '@/utils/storage';

export default {
  // ======================================= 首页相关
  getSlider: () => request('hawkeyepc/v1/banner'), // 首页轮播图
  getTodayPredict: () => request('hawkeyepc/v1/guess/today_guess'), // 今日预测信息
  getLiveList: () => request('hawkeyepc/v1/match/lives_list'), // 直播列表
  getUpcommingList: () => request('hawkeyepc/v1/match/upcoming_leagues_list'), // 联赛预告列表
  getResultList: () => request('hawkeyepc/v1/match/result_list') // 赛事结果
};
