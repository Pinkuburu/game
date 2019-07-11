import { isDevMode } from './utils';

const middlewares: any[] = [];

// 开发环境创建中间件logger
if (isDevMode()) {
  // eslint-disable-next-line
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    // 折叠
    collapsed: true,
    // 过滤
    // 目前只是为了过滤掉@@router/LOCATION_CHANGE
    predicate: (preState: any, { type }: { type: string }) =>
      !new RegExp('@@router/LOCATION_CHANGE').test(type)
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
