import React from 'react';
import styles from './styles.less';
import TableView from './TableView';
import SelectLeague from './SelectLeague';
import TabBar from './TabBar/';
import Panel from './Panel';
interface IProps {
  gameType: number;
  leagueList: [];
  matchList: [];
}

class MatchTableView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { leagueList, matchList } = this.props;
    return (
      <div className={styles.container}>
        <Panel />
        <TabBar />
        <div className={styles.tableContainer}>
          <SelectLeague leagueList={leagueList} />
          <TableView dataSource={matchList} />
        </div>
      </div>
    );
  }
}

export default MatchTableView;
