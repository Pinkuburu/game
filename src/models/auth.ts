import { NAMESPACE } from '../common/constant';
import { DvaModel } from '../common/interfaces/model';
interface IState {
  isLogined: boolean;
}
const model: DvaModel<IState> = {
  namespace: NAMESPACE.AUTH,
  state: {
    isLogined: false
  },
  reducers: {},
  subscriptions: {}
};
export default model;
