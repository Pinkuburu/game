import * as React from 'react';
import propTypes from 'prop-types';
import { Tabs, Card, List } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import _ from 'lodash';
import ReactTable from 'react-table';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import imgSet, { imgStore } from '../atoms/Image/imgStore';
import ucDisplay from './ucDisplay';
import './match_panel.less';

const { TabPane } = Tabs;

export interface MatchPanelProps {
  gameType: 'ALL' | 'DOTA2' | 'CSGO' | 'LOL';
  UCGroup: {};
  UCLeagues: {};
  dispatch: (action: {}) => void;
}

export interface MatchPanelState {
  gameFilter: {
    game_type: 'dota2' | 'lol' | 'csgo';
    dota2: {};
    lol: {};
    csgo: {};
    date: number;
    curFilter: () => {};
  };
  gameList: {
    key: string;
    name: string;
    icon: string;
  }[];
  ucDateFilter: [];
}

// interface leagueItem {
//   league_name: string;
//   league_id: string;
//   game_type: string;
//   league_img_url: string;
//   select: boolean;
//   count: number;
// }

function GameFilter({ onSelect, gameList, activeType }) {
  return (
    <div className="tabs d-flex text-center">
      {gameList.map((game: any, idx: string) => (
        <div
          key={game.name}
          className={classNames('tab', { active: activeType === game.key })}
          onClick={() => onSelect(game, idx)}
        >
          <img className="mr-1" width="22" height="22" src={game.icon} alt=" " />
          {game.name.toLocaleUpperCase()}
        </div>
      ))}
    </div>
  );
}

GameFilter.propTypes = {
  onSelect: propTypes.func.isRequired,
  gameList: propTypes.array.isRequired,
  activeType: propTypes.number.isRequired
};

function geneDateList(status: 1 | -1) {
  // 1是预告的，-1是结果的
  const dateTime = dayjs().format('YYYY-MM-DD');
  const dateObj = dayjs(dateTime).locale('zh-cn');
  const dateList = _.range(7).map((cur: number) => {
    const curDay = dateObj.add((cur + 1) * status, 'day');
    return {
      text: curDay.format('MM-DD ddd'),
      time: curDay.unix()
    };
  });
  return dateList;
}

const initGameList = [
  {
    key: 'dota2',
    name: 'DOTA2',
    icon: imgStore.dota2
  },
  {
    key: 'lol',
    name: 'LOL',
    icon: imgStore.lol
  },
  {
    key: 'csgo',
    name: 'CSGO',
    icon: imgStore.csgo
  }
];

const initFilter = {
  game_type: 'dota2',
  dota2: {}, // 各个游戏的联赛过滤
  lol: {},
  csgo: {},
  date: 0,
  get curFilter(): {} {
    return this[this.game_type];
  }
};

class MatchPanel extends React.Component<MatchPanelProps, MatchPanelState> {
  constructor(props: MatchPanelProps) {
    super(props);
    const { gameList, gameFilter } = this.filterList(props.gameType, true);
    this.state = {
      gameList: gameList,
      gameFilter: gameFilter,
      ucDateFilter: geneDateList(1),
      reDateFilter: geneDateList(-1)
    };
  }

  // componentDidMount() {
  //
  // }

  componentDidUpdate(preProps: MatchPanelProps) {
    const { gameType } = this.props;
    if (gameType !== preProps.gameType) {
      const { gameList, gameFilter } = this.filterList(gameType, false);
      this.setState({
        gameList,
        gameFilter
      });
    }
  }

  mapLeagueList() {
    const { UCLeagues } = this.props;
    // eslint-disable-next-line camelcase
    const { game_type } = this.state.gameFilter;
    const leagues = _.get(UCLeagues, game_type, []);
    return leagues;
  }

  mapMatchList() {
    const { gameFilter } = this.state;
    const { UCGroup } = this.props;
    const leagueFilter = gameFilter.curFilter;
    const gameM = _.get(UCGroup, gameFilter.game_type, {});
    const info = Object.keys(leagueFilter);
    const mObj = info.length === 0 ? gameM : _.pcik(info.filter((key) => leagueFilter[key]));
    const flatM = Object.values(mObj).flat();
    if (gameFilter.date === 0) {
      return flatM;
    }
    return flatM.filter((m) => m.start_time === gameFilter.date);
  }

  filterList(gameType: 'ALL' | 'DOTA2' | 'LOL' | 'CSGO', init: boolean) {
    let tempGameList;
    let tempGameFilter;
    if (init) {
      tempGameList = initGameList;
      tempGameFilter = initFilter;
    } else {
      const { gameList, gameFilter } = this.state;
      tempGameList = gameList;
      tempGameFilter = gameFilter;
    }

    if (gameType === 'ALL') {
      return {
        gameList: tempGameList,
        gameFilter: tempGameFilter
      };
    }
    const key = gameType.toLocaleLowerCase();
    return {
      gameList: tempGameList.filter((game) => game.key === key),
      gameFilter: {
        ...tempGameFilter,
        game_type: key
      }
    };
  }
  // idx: number
  selectFilterGame(game: any) {
    const newFilter = {
      ...this.state.gameFilter,
      game_type: game.key,
      date: 0
    };
    this.setState({
      gameFilter: newFilter
    });
  }

  selectDate(it: any) {
    const newFilter = {
      ...this.state.gameFilter,
      date: it.time
    };
    this.setState({
      gameFilter: newFilter
    });
  }

  render() {
    const { gameFilter, gameList, ucDateFilter } = this.state;
    const leaguesList = this.mapLeagueList();
    const lFilter = gameFilter.curFilter;

    const matchList = this.mapMatchList();
    return (
      <div className="match-panel eyes_card">
        <GameFilter
          onSelect={(game: {}, idx: number) => this.selectFilterGame(game, idx)}
          gameList={gameList}
          activeType={gameFilter.game_type}
        />
        <Tabs
          className="match-panel"
          tabBarGutter={48}
          tabBarStyle={{ border: 'none', lineHeight: '40px' }}
          defaultActiveKey="0"
        >
          <TabPane className="d-flex" tab="赛事预告" key="0">
            <Card
              title={
                <span>
                  <input type="checkbox" className="align-middle" />
                  <span>联赛</span>
                </span>
              }
              bordered={false}
              extra={
                <span>
                  <img
                    className="align-middle"
                    width={20}
                    height={20}
                    src={imgSet.deleteIcon}
                    alt=""
                  />
                  <span>清除</span>
                </span>
              }
              className="league_filter"
            >
              <List
                dataSource={leaguesList}
                renderItem={(it: {}) => (
                  <List.Item className="pointer" onClick={() => this.selectLeagueFilter(it)}>
                    <input
                      className="align-middle"
                      checked={_.get(lFilter, it.league_id, false)}
                      type="checkbox"
                      name=""
                      id=""
                    />
                    <img width="20" height="20" src={it.league_img_url} alt="" />
                    <span className="league_name text-truncate">{it.league_name}</span>
                    <span className="count">{it.count}</span>
                  </List.Item>
                )}
              />
            </Card>
            <Card className="match-list flex-grow-1" bordered={false}>
              <List
                dataSource={ucDateFilter}
                renderItem={(it: {}) => (
                  <List.Item
                    className={classNames('pointer menu-font d-inline-block date-item', {
                      active: gameFilter.date === it.time
                    })}
                    onClick={() => this.selectDate(it)}
                  >
                    {it.text}
                  </List.Item>
                )}
              />
              <ReactTable data={matchList} columns={ucDisplay} className="-striped" />
            </Card>
          </TabPane>
          <TabPane tab="赛事结果" key="1">
            123
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect((state: any) => state.global)(MatchPanel);
