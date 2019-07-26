import { AxiosResponse } from 'axios';
import { isDevMode, globalMessage } from '../../../utils';

type ResponseInterceptor = (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

// todo: 在响应之前做些什么 比如checkStatus
export const responseInterceptor: ResponseInterceptor = (response) => {
  if (isDevMode()) {
    // console.group(`${response.config.url}的请求结果`);
    console.group(response.config.url);
    console.log(response.data);
    console.groupEnd();
  }
  // status不为0时为未返回正确结果
  if (response.data.status !== 0) {
    const { msg, message } = response.data;
    globalMessage(`${msg || message}`, 'warn')
    return Promise.reject(response.data);
  }
  return response.data && response.data.data;
};
