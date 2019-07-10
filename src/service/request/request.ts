// request 是默认实例可直接使用, extend为可配置方法, 传入一系列默认参数, 返回一个新的request实例, 用法与request一致.
import axios from 'axios';
import path from './path';
import { requestInterceptor } from './interceptors/requestInterceptor';
import { requestErrorInterceptor } from './interceptors/requestErrorInterceptor';
import { responseInterceptor } from './interceptors/responseInterceptor';
import { responseErrorInterceptor } from './interceptors/responseErrorInterceptor';

// ref:https://www.kancloud.cn/yunye/axios/234845

// 创建实例时设置配置的默认值
const request = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? path.test : path.index
  baseURL: path.index
});

// 添加请求拦截器
request.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// 添加响应拦截器
request.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default request;
