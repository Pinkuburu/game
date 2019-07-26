import { notification } from 'antd';
import { isDevMode } from '../../../utils'

type ResponseErrorInterceptor = (error: any) => any;

// todo: 对请求错误做些什么 比如token过期重新请求
export const responseErrorInterceptor: ResponseErrorInterceptor = (error) => {
  let errMsg = error.message;
  let errStatus;
  if (error.response && error.response.data) {
    errMsg = error.response.data.msg || error.response.data.message;
    errStatus = error.response.data.status || '';
  }
  if (isDevMode) {
    notification.error({
      message: '网络请求出错了 待添加处理',
      description: `${errStatus}: ${errMsg}`
    });
  }
  // 如果Promise.reject 错误将继续抛出.
  // return 其他值 则表明错误已处理 不再继续抛出
  return Promise.reject(error);
};
