import { ActionType, NAMESPACE } from '../models/constants';
import { Storage, StorageKey } from './storage';
import { message } from 'antd';
export { NAMESPACE, ActionType };

// 访问全局state
export function globalStore() {
  return (window as any).g_app._store.getState();
}

// 全局dispatch方法
export function globalDispatch(action: { type: string; payload?: any }) {
  return (window as any).g_app._store.dispatch(action);
}

// 全局关闭Modal的方法
export function globalCloseModal() {
  globalDispatch({
    type: `${NAMESPACE.GLOBAL}/${ActionType.change_modal}`,
    payload: null
  });
}
// 全局开启Modal的方法
export function globalOpenModal(children: React.ReactNode) {
  globalDispatch({
    type: `${NAMESPACE.GLOBAL}/${ActionType.change_modal}`,
    payload: children
  });
}

// 全局的消息提示
// 暂时用antd的message。后面若是设计稿相关样式改动较大。再考虑自己写组件
export function globalMessage(
  msg: string,
  type: 'warn' | 'success' | 'error' | 'loading' = 'warn',
  duration = 3
): any {
  return message[type](msg, duration);
}

// 如果可以则登录
export function tryLoginIfNeedLogin() {
  if (!globalStore()[NAMESPACE.AUTH].isLogined && Storage.get(StorageKey.REFRESH_TOKEN)) {
    // 直接登录
    globalDispatch({
      type: `${NAMESPACE.AUTH}/${ActionType.get_user_info}`
    });
  }
}

// Api请求时携带token
export function withToken() {
  return { headers: { token: Storage.get(StorageKey.REFRESH_TOKEN) } };
}

// 判断是否为开发环境
export function isDevMode(): boolean {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    isDevMode = () => true;
  } else {
    // eslint-disable-next-line
    isDevMode = () => false;
  }
  return isDevMode();
}

// 参考https://blog.csdn.net/u011415782/article/details/85601655
// 使用较为宽松的标准
export function isMobile(mob: string): boolean {
  return matchWithRegExp(/^[1]([3-9])[0-9]{9}$/, mob);
}

export function isPureNumber(number: string) {
  return matchWithRegExp(/^[0-9]*$/, number);
}

export function isSmsCode(code: string) {
  return code.length === 6 && isPureNumber(code);
}

export function isPassword(password: string) {
  const length = password.trim().length;
  return length >= 8 && length <= 16;
}

export function hasSpace(str: string) {
  return matchWithRegExp(/[\s\t\n]+/, str);
}

function matchWithRegExp(key: RegExp, value: string): boolean {
  return new RegExp(key).test(value);
}
