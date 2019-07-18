import React from 'react';
import styles from './styles.less';
import TableView from './TableView';
import SelectLeague from './SelectLeague';
import TabBar from './TabBar/';
import Panel from './Panel';
interface IProps {
  gameType: number;
  leagueList: [];
}

class MatchTableView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { leagueList } = this.props;
    return (
      <div className={styles.container}>
        <Panel />
        <TabBar />
        <div className={styles.tableContainer}>
          <SelectLeague leagueList={leagueList} />
          <TableView />
        </div>
      </div>
    );
  }
}

export default MatchTableView;
