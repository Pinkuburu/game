import React from 'react';

import { CirGameIcon } from '../../../../../components/atoms/Image/imgStore';
import { GameTypeEnum } from '../../../../../common/enums';
import { ActionType } from '../../../constants';
import Image from '../../../../../components/atoms/Image';
import styles from './styles.less';
import classnames from 'classnames';
import { globalDispatch } from '../../../../../utils';
interface IProps {
  currentGameType: GameTypeEnum[];
}
export default class Panel extends React.PureComponent<IProps> {
  handleGameTypeChange(gameType: any) {
    globalDispatch({
      type: ActionType.change_current_game_type_with_namespace,
      payload: gameType
    });
  }

  render() {
    const { currentGameType } = this.props;
    return (
      <div className={styles.panel}>
        <Image
          src={CirGameIcon.dota2}
          alt="dota2"
          width={22}
          height={22}
          text="Dota2"
          onClick={this.handleGameTypeChange.bind(this, GameTypeEnum.DOTA2)}
          textClassName={classnames(styles.gameText, {
            [styles.gameTextActive]: currentGameType.includes(GameTypeEnum.DOTA2)
          })}
        />
        <Image
          src={CirGameIcon.lol}
          alt="lol"
          width={22}
          height={22}
          text="LOL"
          onClick={this.handleGameTypeChange.bind(this, GameTypeEnum.LOL)}
          textClassName={classnames(styles.gameText, {
            [styles.gameTextActive]: currentGameType.includes(GameTypeEnum.LOL)
          })}
        />
        <Image
          src={CirGameIcon.csgo}
          alt="csgo"
          width={22}
          height={22}
          text="CSGO"
          onClick={this.handleGameTypeChange.bind(this, GameTypeEnum.CSGO)}
          textClassName={classnames(styles.gameText, {
            [styles.gameTextActive]: currentGameType.includes(GameTypeEnum.CSGO)
          })}
        />
      </div>
    );
  }
}
