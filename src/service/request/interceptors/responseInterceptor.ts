import { AxiosResponse } from 'axios';
import { message as AntdMessage } from 'antd';
import { isDevMode } from '../../../utils';

type ResponseInterceptor = (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

// todo: 在响应之前做些什么 比如checkStatus
export const responseInterceptor: ResponseInterceptor = (response) => {
  if (isDevMode()) {
    // console.group(`${response.config.url}的请求结果`);
    console.group(response.config.url);
    console.log(response.data);
    console.groupEnd();
  }
  // status为0时是请求成功
  if (response.data.status !== 0) {
    const { status, msg, message } = response.data;
    AntdMessage.warning(`${status || '未知状态'}: ${msg || message}`);
    return Promise.reject(response.data);
  }
  return response.data && response.data.data;
};
