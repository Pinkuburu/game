import React from 'react';
import styles from './styles.less';
import TableView from './TableView';
import SelectLeague from './SelectLeague';
import TabBar from './TabBar/';
import Panel from './Panel';
import { GameTypeEnum } from '../../../../common/enums';
import { MatchType } from '../../constants';
interface IProps {
  gameType: number;
  leagueList: [];
  matchList: [];
  currentDate: number;
  currentGameType: GameTypeEnum[];
  currentMatchType: MatchType;
  currentSelectedLeaguesId: number[];
}

class MatchTableView extends React.Component<IProps> {
  render() {
    const {
      leagueList,
      matchList,
      currentDate,
      currentGameType,
      currentMatchType,
      currentSelectedLeaguesId
    } = this.props;
    return (
      <div className={styles.container}>
        <Panel currentGameType={currentGameType} />
        <TabBar currentMatchType={currentMatchType} />
        <div className={styles.tableContainer}>
          <SelectLeague
            leagueList={leagueList}
            currentSelectedLeaguesId={currentSelectedLeaguesId}
          />
          <TableView
            dataSource={matchList}
            currentDate={currentDate}
            currentMatchType={currentMatchType}
          />
        </div>
      </div>
    );
  }
}

export default MatchTableView;
