// import { EnumToText } from './enumToText';

// export { EnumToText };
// 游戏类型
export enum GameTypeEnum {
  ALL = 'all',
  DOTA2 = 'dota2',
  CSGO = 'csgo',
  LOL = 'lol'
}

// 支付方式
export enum PayWayEnum {
  aliPay,
  wechatPay
}

// 会员产品类型
export enum ProductIdEnum {
  WEEK_FOR_DOTA2 = 1, // 1-Dota2周会员
  MONTH_FOR_DOTA2 // 2-Dota2月会员
}

// 联赛状态
export enum LeagueStatusEnum {
  RECENT = 1, // 最近的
  DONE, // 已结束
  UPCOMING // 未开始
}

// ================== Enum转Text
export const EnumToText = {
  LeagueStatus: {
    [LeagueStatusEnum.RECENT]: '进行中',
    [LeagueStatusEnum.DONE]: '已结束',
    [LeagueStatusEnum.UPCOMING]: '未开始'
  }
};
