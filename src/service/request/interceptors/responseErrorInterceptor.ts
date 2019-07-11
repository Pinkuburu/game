import { notification } from 'antd';
type ResponseErrorInterceptor = (error: any) => any;

// todo: 对请求错误做些什么 比如token过期重新请求
export const responseErrorInterceptor: ResponseErrorInterceptor = (error) => {
  console.log(JSON.stringify(error));
  notification.error({
    message: '网络请求出错了',
    description: '待添加处理'
  });
  // 如果Promise.reject 错误将继续抛出.
  // return 其他值 则表明错误已处理 不再继续抛出
  return Promise.reject(error);
};
