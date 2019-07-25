import iconLogo from '../../../assets/logo_s.svg';
import iconSchedule from '../../../assets/icon_saicheng_s.svg';
import iconLeague from '../../../assets/icon_liansai_s.svg';
import iconPredict from '../../../assets/icon_yuce_s.svg';
import iconTeam from '../../../assets/icon_zhandui_s.svg';
import iconPlayer from '../../../assets/icon_xuanshou_s.svg';
import iconScheduleD from '../../../assets/icon_saicheng_d.png';
import iconLeagueD from '../../../assets/icon_liansai_d.png';
import iconPredictD from '../../../assets/icon_yuce_d.png';
import iconTeamD from '../../../assets/icon_zhandui_d.png';
import iconPlayerD from '../../../assets/icon_xuanshou_d.png';
import cirDota from '../../../assets/logo_DOTA2.svg';
import iconAllGame from '../../../assets/logo_all.svg';
import cirLol from '../../../assets/logo_LOL.svg';
import cirCsgo from '../../../assets/logo_CSGO.svg';
import userImg from '../../../assets/icon_personal.png';
import leagueS from '../../../assets/icon_select_d.png';
import leagueD from '../../../assets/icon_select_s.png';
import deleteIcon from '../../../assets/icon_delete.png';
import noDataIcon from '../../../assets/icon_no_data.svg';
import checkPredict from '../../../assets/check-predict.svg';
import douyu from '../../../assets/douyu_logo.svg';
import huya from '../../../assets/huya_logo.svg';
import huomao from '../../../assets/huomao_logo.svg';
import twitch from '../../../assets/twitch_logo.svg';

export const CirGameIcon = {
  dota2: cirDota,
  lol: cirLol,
  csgo: cirCsgo
};

const ImageStore = {
  logo: iconLogo,
  menuList: [iconSchedule, iconLeague, iconTeam, iconPlayer, iconPredict],
  fade_menuList: [iconScheduleD, iconLeagueD, iconTeamD, iconPlayerD, iconPredictD],
  iconAllGame,
  cirGameIcon: [cirDota, cirLol, cirCsgo],
  userImg,
  leagueSelect: [leagueS, leagueD],
  deleteIcon,
  noDataIcon,
  checkPredict,
  live: {
    douyu,
    huomao,
    twitch,
    huya
  }
};

export default ImageStore;
