import { GameTypeEnum } from './enums';
import ImageStore from '../components/atoms/Image/imgStore';
export default {
  pageSize: 20 // 默认每页搜索条数
};

// models的namespace
export const NAMESPACE = {
  GLOBAL: 'global',
  AUTH: 'auth',
  LEAGUE: 'league',
  LEAGUE_DETAILS: 'leagueDetails', // 联赛详情
  HOME: 'home', // 首页
  MATCH: 'match', // 首页赛事部分
  LOADING: 'loading', // 框架自带
  ROUTING: 'routing' // 框架自带
};

// 游戏信息
export const GameInfo = {
  [GameTypeEnum.ALL]: {
    text: '全部游戏',
    icon: ImageStore.iconAllGame
  },
  [GameTypeEnum.DOTA2]: {
    text: 'DOTA2',
    icon: ImageStore.cirGameIcon[0]
  },
  [GameTypeEnum.LOL]: {
    text: 'LOL',
    icon: ImageStore.cirGameIcon[1]
  },
  [GameTypeEnum.CSGO]: {
    text: 'CSGO',
    icon: ImageStore.cirGameIcon[2]
  }
};
