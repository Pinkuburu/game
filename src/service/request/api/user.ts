import request from '../request';
import path from '../path';
import { globalMessage, globalStore, NAMESPACE, withToken } from '@/utils';

const baseUrl = path.user;

export default {
  sendSmsForLogin: (data: { mobile: string }) =>
    request.post(`${baseUrl}/user/v1/login/send_sms_code`, data), // 获取手机验证码
  sendSmsForRegister: (data: { mobile: string }) =>
    request.post(`${baseUrl}/user/v1/register/send_sms_code`, data), // 获取手机验证码
  sendSmsForForget: (data: { mobile: string }) =>
    request.post(`${baseUrl}/user/v1/forget/send_sms_code`, data), // 获取手机验证码
  getGTVerify: () =>
    request(`${baseUrl}/gtcaptcha/v1/start_captcha_servlet?t=${new Date().getTime()}`), // 获取登录框中的验证插件
  doLogin: (data: {
    mobile: string;
    code?: string;
    password?: string; // 还有图形验证相关参数
  }) => request.post(`${baseUrl}/user/v1/login/do_login`, data), // 登录
  doRegister: (data: {
    mobile: string;
    code: string;
    password: string; // 还有图形验证相关参数
  }) => request.post(`${baseUrl}/user/v1/register/do_register`, data), // 注册
  doRestPassword: (data: { mobile: string; code: string; password: string }) =>
    request.post(`${baseUrl}/user/v1/forget/reset`, data), // 重置密码
  doRestPasswordWithToken: (data: { old_password: string; new_password: string }) =>
    request.post(`${baseUrl}/user/v1/reset_password`, data, { ...withToken() }), // 重置密码
  checkForForget: (data: {
    mobile: string;
    code: string; // 还有图形验证相关参数
  }) => request.post(`${baseUrl}/user/v1/forget/check`, data), // 重设密码前检查身份
  getUserInfo: () => request(`${baseUrl}/user/v1/get_user_info`, { ...withToken() }), // 获取用户信息
  wechatPay: (data: { product_id: number }) =>
    request.post(`${baseUrl}/user/v1/member/place`, data, { ...withToken() }), // 微信支付
  aliPay: (data: { product_id: number }) =>
    request.post(`${baseUrl}/user/v1/member/alipay_place`, data, { ...withToken() }), // 支付宝支付
  editUserInfo: (data: { name: string; img: string }) =>
    request.post(`${baseUrl}/user/v1/edit_user_info`, data, { ...withToken() }), // 修改个人信息(昵称和头像)
  sendFeedback: (data: { content: string }) =>
    request.post(`${baseUrl}/user/v1/feedback/send`, data, { ...withToken() }), // 修改个人信息(昵称和头像)
  // 查询订单状态
  checkOrderStatus: (data: { id: string }) =>
    new Promise((resolve, reject) => {
      const hasMoldalBefore = globalStore()[NAMESPACE.GLOBAL].modal !== null;
      const timer = setInterval(() => {
        request
          .post(`${baseUrl}/user/v1/member/query_order_status`, data, {
            ...withToken()
          })
          .then((res) => {
            switch (res.status) {
              case 2:
                // 支付成功
                clearInterval(timer);
                globalMessage('充值成功', 'success');
                resolve();
                break;
              case 3:
                // 支付失败
                clearInterval(timer);
                globalMessage('充值失败,请稍后重试', 'error');
                reject();
                break;
            }
            if (hasMoldalBefore) {
              const hasMoldalNow = globalStore()[NAMESPACE.GLOBAL].modal !== null;
              if (!hasMoldalNow) {
                clearInterval(timer);
              }
            }
          })
          .catch((e) => {
            clearInterval(timer);
            globalMessage('充值失败,请稍后重试', 'error');
            reject(e);
          });
      }, 2000);
    })
};
