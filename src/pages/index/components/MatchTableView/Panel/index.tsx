import React from 'react';

import { CirGameIcon } from '../../../../../components/atoms/Image/imgStore';
import Image from '../../../../../components/atoms/Image';
import styles from './styles.less';

interface IProps {}

export default class Panel extends React.PureComponent<IProps> {
  render() {
    return (
      <div className={styles.panel}>
        <Image src={CirGameIcon.dota2} alt="dota2" width={22} height={22} text={'Dota2'} />
        <Image src={CirGameIcon.lol} alt="lol" width={22} height={22} text={'LOL'} />
        <Image src={CirGameIcon.csgo} alt="csgo" width={22} height={22} text={'CSGO'} />
      </div>
    );
  }
}
