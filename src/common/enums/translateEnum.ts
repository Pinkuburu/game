import { GameTypeEnum } from './index';

interface translateEnum {
  [fromEnum: number]: string;
}

export const TranslateGameTypeEnum: translateEnum = {
  [GameTypeEnum.ALL]: 'ALL',
  [GameTypeEnum.DOTA2]: 'DOTA2'
};
