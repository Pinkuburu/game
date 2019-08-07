import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import classnames from 'classnames';
import Image, { ImgStore } from '@/components/atoms/Image';
import * as DataType from '@/common/interfaces/dataType';
import styles from './styles.less';
import ZoneTabBar from './ZoneTabBar';

const dateFormate = 'YYYY.MM.DD';
interface IProps {
  info: DataType.LeagueDetailInfo;
  partationList: any[];
}

class LeagueInfoPane extends React.PureComponent<IProps> {
  render() {
    const { info, partationList } = this.props;
    const startTime = moment.unix(info.start_time).format(dateFormate);
    const endTime = moment.unix(info.end_time).format(dateFormate);
    return (
      <>
        <div className={styles.paneContainer}>
          <div className={classnames(styles.item, styles.basicInfo)}>
            <Image src={info.img_urls && info.img_urls.img_desc_logo} width={72} height={72} />
            <div>
              <p>{info.name}</p>
              <p>{`${startTime}-${endTime}`}</p>
            </div>
          </div>
          {this.buildPaneItem(info.organizer, '举办方', ImgStore.dark.sponsor, styles.item)}
          {this.buildPaneItem(info.match_city, '举办地', ImgStore.dark.place, styles.item)}
          {this.buildPaneItem(info.team_nums, '队伍', ImgStore.dark.team, styles.item)}
          {this.buildPaneItem(info.tier, '级别', ImgStore.dark.reward, styles.item)}
          {this.buildPaneItem(info.prize_money, '奖金', ImgStore.dark.bonus, styles.item, true)}
          <Image src={ImgStore.dark.sponsor} width={30} height={30} className={styles.item} />
        </div>
        <ZoneTabBar tabItemList={partationList} />
      </>
    );
  }
  buildPaneItem(
    text: string | number,
    label: string,
    src: string,
    className?: string,
    isGold?: boolean
  ) {
    return (
      <div className={className}>
        <Image src={src} text={label} width={20} height={20} />
        <p className={isGold ? styles.gold : styles.text}>{text}</p>
      </div>
    );
  }
}

interface ConnectState {
  leagueDetails: any;
}

export default connect((state: ConnectState) => ({
  info: state.leagueDetails.info,
  partationList: state.leagueDetails.partationList
}))(LeagueInfoPane);
