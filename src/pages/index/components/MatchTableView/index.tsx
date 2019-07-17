import React from 'react';
import styles from './styles.less';
import Table from '../../../../components/atoms/Table';
import TabBar from './TabBar/';
import Panel from './Panel';
interface IProps {}

class MatchTableView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <Panel />
        <TabBar />
        <Table />
      </div>
    );
  }
}

export default MatchTableView;
