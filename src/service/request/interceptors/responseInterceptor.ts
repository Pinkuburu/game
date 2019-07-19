import { AxiosResponse } from 'axios';
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
  return response.data && response.data.data;
};
