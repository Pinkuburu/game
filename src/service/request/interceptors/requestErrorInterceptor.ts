import { notification } from 'antd';
import { isDevMode } from '../../../utils'

type RequestErrorInterceptor = (error: any) => any;
// todo: 对请求错误做些什么
export const requestErrorInterceptor: RequestErrorInterceptor = (error) => {
  if (isDevMode) {
    notification.error({
      message: '这里是请求错误拦截器',
      description: '你可能需要做些什么在src/service/request/interceptors/requestErrorInterceptor.ts'
    });
  }
  return error;
};
