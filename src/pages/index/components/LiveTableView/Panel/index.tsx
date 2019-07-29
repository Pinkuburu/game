import React from 'react';
import RefreshIcon from '../../../../../components/atoms/RefreshIcon';
import MusicBar from '../../../../../components/atoms/MusicBar';
import { CirGameIcon } from '../../../../../components/atoms/Image/imgStore';
import Image from '../../../../../components/atoms/Image';
import styles from './styles.less';

interface IProps {
  onRefresh: Function;
}

export default class Panel extends React.PureComponent<IProps> {
  render() {
    const { onRefresh } = this.props;
    return (
      <div className={styles.panel}>
        <div className={styles.panelLeft}>
          <MusicBar />
          <span className={styles.font}>数据直播</span>
          <RefreshIcon onRefresh={onRefresh} />
        </div>
        <div className={styles.selectGame}>
          <Image src={CirGameIcon.dota2} alt="dota2" width={22} height={22} />
          <Image src={CirGameIcon.lol} alt="lol" width={22} height={22} />
          <Image src={CirGameIcon.csgo} alt="csgo" width={22} height={22} />
        </div>
      </div>
    );
  }
}
