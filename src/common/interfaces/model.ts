import { History } from 'history';

export interface ReduxAction {
  type: string;
  payload?: any;
}

export type ReduxDispatch = (action: ReduxAction) => void;

// effects相关
export interface DvaModelEffects {
  [effectName: string]: DvaModelEffect;
}

export type DvaModelEffect = DvaModelEffectFn | DvaModelEffectWithTaker;

export type DvaModelEffectFn = (action: ReduxAction, sagaEffects: ReduxSagaEffects) => any;

export interface ReduxSagaEffects {
  put: ReduxDispatch;
  call: (fn: Function, ...params: any[]) => any;
  select: (fn: (globalState: any) => any) => any;
  // todo:暂未定义具体接口
  take?: any;
}
// TODO:这边还没测试过
// problem
export interface DvaModelEffectWithTaker extends Array<ReduxSagaTaker | DvaModelEffectFn> {
  [index: number]: ReduxSagaTaker | DvaModelEffectFn;
}
export interface ReduxSagaTaker {
  type: string;
  [propsName: string]: any;
}

// reducers相关
export type DvaModelReducer<T> = (preState: T, action: ReduxAction) => any;

export interface DvaModelReducers<T> {
  [reducerName: string]: DvaModelReducer<T>;
}

// subscriptions相关

export interface Subscriptions {
  dispatch: ReduxDispatch;
  history: History;
}

export interface DvaModelSubscriptions {
  [subscriptionsName: string]: (params: Subscriptions) => Function | void;
}

// 总的model
export interface DvaModel<T> {
  namespace?: string;
  state?: T;
  reducers?: DvaModelReducers<T>;
  effects?: DvaModelEffects;
  subscriptions?: DvaModelSubscriptions;
}
