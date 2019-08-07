import React from 'react';
import styles from './styles.less';
import Image from '@/components/atoms/Image';
import Score from '@/components/atoms/Score';
import moment from 'moment';
import * as DataType from '@/common/interfaces/dataType';
import { LeagueStatusEnum, EnumToText } from '@/common/enums';
interface IProps {
  item: DataType.ScheduleResult;
}

export default class ScoreCell extends React.PureComponent<IProps> {
  render() {
    const { item } = this.props;
    return (
      <div className={styles.scoreCell}>
        <div className={styles.timeInfo}>{`${moment
          .unix(item.start_time)
          .format('MM-DD hh:mm')} BO${item.best_of}`}</div>
        <div className={styles.teamInfo}>
          <Image
            src={item.team_a_info.custom_logo}
            height={50}
            width={80}
            textPostion="bottom"
            text={item.team_a_info.tag}
            spacing={4}
          />
          <div className={styles.scoreInfo}>
            <Score value={item.score_a} />
            <Score value={item.score_b} />
          </div>
          <Image
            src={item.team_b_info.custom_logo}
            height={50}
            width={80}
            text={item.team_b_info.tag}
            textPostion="bottom"
            spacing={4}
          />
        </div>
        <span className={styles.status}>
          {EnumToText.LeagueStatus[item.status as LeagueStatusEnum]}
        </span>
      </div>
    );
  }
}
