import { AxiosRequestConfig } from 'axios';
import { isDevMode } from '../../../utils';
type RequestInterceptor = (
  value: AxiosRequestConfig
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

// todo: 在发送请求之前做些什么
export const requestInterceptor: RequestInterceptor = (config) => {
  if (isDevMode()) {
    console.log(`正在请求 ${config.url}`);
  }
  return config;
};
