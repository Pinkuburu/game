import React from 'react';

import { CirGameIcon } from '../../../../../components/atoms/Image/imgStore';
import { GameType, ActionType } from '../../../constants';
import Image from '../../../../../components/atoms/Image';
import styles from './styles.less';
import classnames from 'classnames';
interface IProps {
  currentGameType: GameType[];
}
export default class Panel extends React.PureComponent<IProps> {
  handleGameTypeChange(gameType: any) {
    (window as any).g_app._store.dispatch({
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
          onClick={this.handleGameTypeChange.bind(this, GameType.dota2)}
          textClassName={classnames(styles.gameText, {
            [styles.gameTextActive]: currentGameType.includes(GameType.dota2)
          })}
        />
        <Image
          src={CirGameIcon.lol}
          alt="lol"
          width={22}
          height={22}
          text="LOL"
          onClick={this.handleGameTypeChange.bind(this, GameType.lol)}
          textClassName={classnames(styles.gameText, {
            [styles.gameTextActive]: currentGameType.includes(GameType.lol)
          })}
        />
        <Image
          src={CirGameIcon.csgo}
          alt="csgo"
          width={22}
          height={22}
          text="CSGO"
          onClick={this.handleGameTypeChange.bind(this, GameType.csgo)}
          textClassName={classnames(styles.gameText, {
            [styles.gameTextActive]: currentGameType.includes(GameType.csgo)
          })}
        />
      </div>
    );
  }
}
