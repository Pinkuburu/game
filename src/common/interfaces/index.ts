export interface ReduxSagaEffects {
  put: any;
  call: any;
  select: any;
}

export interface DvaModelEffectFn {
  (action: ReduxAction, sagaEffects: ReduxSagaEffects): any;
}

export interface ReduxSagaTaker {
  type: string;
  [propsName: string]: any;
}
// problem
export interface DvaModelEffectWithTaker extends Array<ReduxSagaTaker | DvaModelEffectFn> {
  [index: number]: ReduxSagaTaker | DvaModelEffectFn;
}

export type DvaModelEffect = DvaModelEffectFn | DvaModelEffectWithTaker;

export interface DvaModelEffects {
  [effectName: string]: DvaModelEffect;
}

export interface ReduxAction {
  type: string;
  [propName: string]: any;
}
export interface DvaModelReducer {
  (preState: object, action: ReduxAction): any;
}

export interface DvaModelReducers {
  [reducerName: string]: DvaModelReducer;
}

export interface DvaModel<T> {
  namespace: string;
  state?: T;
  reducers?: DvaModelReducers;
  effects?: DvaModelEffects;
  subscriptions?: object;
}
