import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import TabBar, { CustomTabPane } from '@/components/molecules/TabBar';
import CustomTable from '../CustomTable';
import { GameTypeEnum, LeagueStatusEnum } from '@/common/enums';
import { ActionType, NAMESPACE } from '../../constant';
import * as DataType from '@/common/interfaces/dataType';
import { Columns } from './ColumnsConfig';
import styles from './styles.less';

interface IProps {
  dispatch: (action: { type: string; payload?: any }) => void;
  originRecentLeagueList: DataType.ClassifiedByGameType<DataType.LeagueDetailInfo[]>;
  originDoneLeagueList: DataType.ClassifiedByGameType<DataType.LeagueDetailInfo[]>;
  loading: boolean;
}

enum TabKey {
  RECENT = 'RECENT',
  DONE = 'DONE'
}

interface IState {
  currentTabKey: TabKey;
  isNoMoreData: {
    [TabKey.RECENT]: boolean;
    [TabKey.DONE]: boolean;
  };
}

class LeagueTable extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentTabKey: TabKey.RECENT,
      isNoMoreData: { [TabKey.RECENT]: false, [TabKey.DONE]: false }
    };
    this.handleTabBarChange = this.handleTabBarChange.bind(this);
    this.getLeagueListAccrodingCurrentTabKey = this.getLeagueListAccrodingCurrentTabKey.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleLeagueRowClick = this.handleLeagueRowClick.bind(this);
  }
  componentDidMount() {
    const { originRecentLeagueList, originDoneLeagueList } = this.props;
    !originRecentLeagueList[GameTypeEnum.DOTA2].length &&
      this.getLeagueList(GameTypeEnum.DOTA2, LeagueStatusEnum.RECENT);
    !originDoneLeagueList[GameTypeEnum.DOTA2].length &&
      this.getLeagueList(GameTypeEnum.DOTA2, LeagueStatusEnum.DONE);
  }

  getLeagueList(gameType: GameTypeEnum, status: LeagueStatusEnum) {
    const { dispatch } = this.props;
    const { currentTabKey, isNoMoreData } = this.state;
    dispatch({
      type: `${NAMESPACE.LEAGUE}/${ActionType.get_league_list}`,
      payload: {
        type: gameType,
        status,
        onSuccess: (hasNewData: boolean) => {
          if (!hasNewData)
            this.setState({
              isNoMoreData: { ...isNoMoreData, ...{ [currentTabKey]: true } }
            });
        }
      }
    });
  }

  handleTabBarChange(tabKey: string) {
    const { currentTabKey } = this.state;
    if (currentTabKey === tabKey) return;
    switch (tabKey as TabKey) {
      case TabKey.RECENT:
        this.setState({ currentTabKey: tabKey as TabKey });
        break;
      case TabKey.DONE:
        this.setState({ currentTabKey: tabKey as TabKey });
        break;
    }
  }
  handleLoadMore() {
    const { currentTabKey } = this.state;
    switch (currentTabKey) {
      case TabKey.RECENT:
        this.getLeagueList(GameTypeEnum.DOTA2, LeagueStatusEnum.RECENT);
        break;
      case TabKey.DONE:
        this.getLeagueList(GameTypeEnum.DOTA2, LeagueStatusEnum.DONE);
        break;
    }
  }

  getLeagueListAccrodingCurrentTabKey() {
    const { currentTabKey } = this.state;
    const { originRecentLeagueList, originDoneLeagueList } = this.props;

    switch (currentTabKey) {
      case TabKey.RECENT:
        return originRecentLeagueList;
      case TabKey.DONE:
        return originDoneLeagueList;
      default:
        return originRecentLeagueList;
    }
  }

  handleLeagueRowClick(record: any, index: number, event: Event) {
    if (record.status === LeagueStatusEnum.UPCOMING) return;
    router.push(`/league/details/${record.id}`);
  }

  render() {
    const { loading } = this.props;
    const { isNoMoreData, currentTabKey } = this.state;
    const leagueList = this.getLeagueListAccrodingCurrentTabKey();
    return (
      <div className={styles.leagueListContainer}>
        <TabBar
          defaultActiveKey={TabKey.RECENT}
          activeBorderPosition="Top"
          activeWithMark={true}
          onChange={this.handleTabBarChange}
        >
          <CustomTabPane key={TabKey.RECENT} tab="最近联赛" />
          <CustomTabPane key={TabKey.DONE} tab="结束联赛" />
        </TabBar>
        <CustomTable
          columns={Columns}
          dataSource={leagueList[GameTypeEnum.DOTA2]}
          rowKey="id"
          loading={loading}
          rowHeight={100}
          headerRowHeight={30}
          scroll={{ y: 500 }}
          onLoadMore={this.handleLoadMore}
          isNoMoreData={isNoMoreData[currentTabKey]}
          onRowClick={this.handleLeagueRowClick}
        />
      </div>
    );
  }
}

interface ConnectState {
  league: any;
  loading: any;
}

export default connect((state: ConnectState) => ({
  originRecentLeagueList: state.league.originRecentLeagueList,
  originDoneLeagueList: state.league.originDoneLeagueList,
  loading: state.loading.effects[`${NAMESPACE.LEAGUE}/${ActionType.get_league_list}`]
}))(LeagueTable);
