import { isDevMode } from './utils';

const middlewares: any[] = [];

// 开发环境创建中间件logger
if (isDevMode()) {
  // eslint-disable-next-line
  const { createLogger } = require('redux-logger');

  // 是否隐藏框架自带的action 比如有关路由和loading的
  const isHideNativeAction = true;
  const logger = createLogger({
    // 折叠
    collapsed: true,
    // 过滤
    predicate: (preState: any, { type }: { type: string }) => {
      if (isHideNativeAction) {
        return !new RegExp('.*@@.*').test(type);
      }
      return true;
    }
  });
  middlewares.push(logger);
}

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
    },
    onAction: middlewares
  }
};
