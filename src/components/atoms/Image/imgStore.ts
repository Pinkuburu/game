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
import leagueS from '../../../assets/icon_select_d.png';
import leagueD from '../../../assets/icon_select_s.png';
import deleteIcon from '../../../assets/icon_delete.png';
import noDataIcon from '../../../assets/icon_no_data.svg';
import checkPredict from '../../../assets/check-predict.svg';
import douyu from '../../../assets/douyu_logo.svg'; // 斗鱼logo
import huya from '../../../assets/huya_logo.svg'; // 虎牙logo
import huomao from '../../../assets/huomao_logo.svg'; // 火猫logo
import twitch from '../../../assets/twitch_logo.svg'; // twitchlogo
import privileges from '../../../assets/privileges.svg'; // 会员特权
import privileges1 from '../../../assets/privileges1.svg'; // 联赛预测
import privileges2 from '../../../assets/privileges2.svg'; // 全面数据
import privileges3 from '../../../assets/privileges3.svg'; // 直播推荐
import privileges4 from '../../../assets/privileges4.svg'; // 个性标识
import privileges5 from '../../../assets/privileges5.svg'; // 功能尝鲜
import iconCamera from '../../../assets/icon_camera.svg'; // 相机
import iconEdit from '../../../assets/icon_edit.svg'; // 编辑
import iconMember from '../../../assets/icon_member.svg'; // 会员
import iconMobile from '../../../assets/icon_mobile.svg'; // 手机
import weekMember from '../../../assets/week_member.svg'; // 周会员
import monthMember from '../../../assets/month_member.svg'; // 月会员
import chooseMember from '../../../assets/choose_member.svg'; // 选择周/月会员
import defaultAvatar from '../../../assets/default_avatar.svg'; // 默认头像
import imgBroken from '../../../assets/img_broken.svg'; // 图片失效时的占位图
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
  leagueSelect: [leagueS, leagueD],
  deleteIcon,
  noDataIcon,
  checkPredict,
  live: { douyu, huomao, twitch, huya },
  privileges: { privileges, privileges1, privileges2, privileges3, privileges4, privileges5 },
  camera: iconCamera,
  edit: iconEdit,
  member: iconMember,
  mobile: iconMobile,
  weekMember,
  monthMember,
  chooseMember,
  defualt: { avatar: defaultAvatar, broken: imgBroken }
};

export default ImageStore;
