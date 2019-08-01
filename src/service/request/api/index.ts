import HomeApi from './home';
import UserApi from './user';
import Dota2Api from './dota2';

export default {
  ...HomeApi,
  ...UserApi,
  ...Dota2Api
};
