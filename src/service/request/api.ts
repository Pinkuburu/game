import request from './request';
import path from './path';

export default {
  // ======================================= 首页相关
  getSlider: () => request('hawkeyepc/v1/banner'), // 首页轮播图
  getTodayPredict: () => request('hawkeyepc/v1/guess/today_guess'), // 今日预测信息
  getLiveList: () => request('hawkeyepc/v1/match/lives_list'), // 直播列表
  getUpcommingList: () => request('hawkeyepc/v1/match/upcoming_leagues_list'), // 联赛预告列表
  getResultList: () => request('hawkeyepc/v1/match/result_list'), // 赛事结果

  // ======================================= user相关
  sendSmsForLogin: (data: { mobile: string }) =>
    request.post(`${path.user}/user/v1/login/send_sms_code`, data), // 获取手机验证码
  sendSmsForRegister: (data: { mobile: string }) =>
    request.post(`${path.user}/user/v1/register/send_sms_code`, data), // 获取手机验证码
  sendSmsForForget: (data: { mobile: string }) =>
    request.post(`${path.user}/user/v1/forget/send_sms_code`, data), // 获取手机验证码
  getGTVerify: () =>
    request(`${path.user}/gtcaptcha/v1/start_captcha_servlet?t=${new Date().getTime()}`), // 获取登录框中的验证插件
  doLogin: (data: {
    mobile: string;
    code?: string;
    password?: string; // 还有图形验证相关参数
  }) => request.post(`${path.user}/user/v1/login/do_login`, data), // 登录
  doRegister: (data: {
    mobile: string;
    code: string;
    password: string; // 还有图形验证相关参数
  }) => request.post(`${path.user}/user/v1/register/do_register`, data), // 注册
  doRestPassword: (data: { mobile: string; code: string; password: string }) =>
    request.post(`${path.user}/user/v1/forget/reset`, data), // 重置密码
  checkForForget: (data: {
    mobile: string;
    code: string; // 还有图形验证相关参数
  }) => request.post(`${path.user}/user/v1/forget/check`, data) // 重设密码前检查身份
};
