import React from 'react';
import { connect } from 'dva';
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
}

class LeagueTable extends React.PureComponent<IProps, IState> {
  RecentPage: number;
  DonePage: number;
  constructor(props: IProps) {
    super(props);
    this.state = { currentTabKey: TabKey.RECENT };
    this.handleTabBarChange = this.handleTabBarChange.bind(this);
    this.getLeagueListAccrodingCurrentTabKey = this.getLeagueListAccrodingCurrentTabKey.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.RecentPage = 1;
    this.DonePage = 1;
  }
  componentDidMount() {
    this.getLeagueList(GameTypeEnum.DOTA2, LeagueStatusEnum.DONE, this.DonePage);
    this.getLeagueList(GameTypeEnum.DOTA2, LeagueStatusEnum.RECENT, this.RecentPage);
    this.handleTabBarChange(TabKey.DONE);
  }

  getLeagueList(gameType: GameTypeEnum, status: LeagueStatusEnum, page?: number) {
    const { dispatch } = this.props;
    console.log(page);
    dispatch({
      type: `${NAMESPACE.LEAGUE}/${ActionType.get_league_list}`,
      payload: {
        type: gameType,
        status,
        page,
        onSuccess: () => {
          switch (status) {
            case LeagueStatusEnum.DONE:
              this.DonePage++;
              break;
            case LeagueStatusEnum.RECENT:
              this.RecentPage++;
              break;
          }
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
        this.getLeagueList(GameTypeEnum.DOTA2, LeagueStatusEnum.RECENT, this.RecentPage);
        break;
      case TabKey.DONE:
        this.getLeagueList(GameTypeEnum.DOTA2, LeagueStatusEnum.DONE, this.DonePage);
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

  render() {
    const { loading } = this.props;
    const leagueList = this.getLeagueListAccrodingCurrentTabKey();
    return (
      <div className={styles.leagueListContainer}>
        <TabBar
          defaultActiveKey={TabKey.DONE}
          withTabBarBottomBorder={false}
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
