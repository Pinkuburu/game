import { GameTypeEnum } from './index';

interface TranslateEnum {
  [fromEnum: number]: string;
}

export const TranslateGameTypeEnum: TranslateEnum = {
  [GameTypeEnum.ALL]: 'ALL',
  [GameTypeEnum.DOTA2]: 'DOTA2'
};
