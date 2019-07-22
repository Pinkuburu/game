import request from './request';
import path from './path';

export default {
  getSlider: () => request('hawkeyepc/v1/banner'), // 首页轮播图
  getTodayPredict: () => request('hawkeyepc/v1/guess/today_guess'), // 今日预测信息
  getLiveList: () => request('hawkeyepc/v1/match/lives_list'), // 直播列表
  getUpcommingList: () => request('hawkeyepc/v1/match/upcoming_leagues_list'), // 联赛预告列表
  getResultList: () => request('hawkeyepc/v1/match/result_list'), // 赛事结果
  getGTVertify: () =>
    request(`${path.user}/gtcaptcha/v1/start_captcha_servlet?t=${new Date().getTime()}`) // 获取登录框中的验证插件
};
