import React from 'react';
import styles from './styles.less';
import Table from '../../../../components/atoms/Table';
import Panel from './Panel';

interface IProps {
  onRefreshData: Function;
}

class LiveTableView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { onRefreshData } = this.props;
    return (
      <div className={styles.container}>
        <Panel onRefresh={onRefreshData} />
        <Table />
      </div>
    );
  }
}

export default LiveTableView;
