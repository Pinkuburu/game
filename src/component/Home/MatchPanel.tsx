import * as React from 'react';
import { Tabs, Card } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import _ from 'lodash';

import imgSet, { imgStore } from './../../utils/imgStore';
import './match_panel.less';

const { TabPane } = Tabs;

export interface MatchPanelProps {
  gameType: string;
}
 
export interface MatchPanelState {
  gameFilter: { name: string; select: boolean; icon: imgStore.lol }[];
  leagueFilter: { select: boolean, leagueName: string, leagueUrl: string }[];
  displayList: [];
}

function GameFilter({ onSelect, gameList }) {
  return (
    <div className="tabs d-flex text-center">
      {gameList.map((game: object, idx: string) => (
        <div
          key={game.name}
          className={classNames('tab', { active: game.select })}
          onClick={() => onSelect(game, idx)}
        >
          <img className="mr-1" width="22" height="22" src={game.icon} alt=" "/>
          {game.name.toLocaleUpperCase()}
        </div>
      ))}
    </div>
  );
}

const initFilter = [
  { name: 'dota2', select: true, icon: imgStore.dota2 },
  { name: 'lol', select: true, icon: imgStore.lol },
  { name: 'csgo', select: true, icon: imgStore.csgo }, 
];



class MatchPanel extends React.Component<MatchPanelProps, MatchPanelState> {
  constructor(props: MatchPanelProps) {
    super(props);
    this.state = {
      gameFilter: this.filterList(props.gameType),
      leagueFilter: [],
      displayList: [],
    };
  }
  componentDidMount() {
    const { upcommingList } = this.props;
    
  }

  filterMatchList(data) {
    const firstFilter = this.gameTypeFilter(data);
    const res = this.matchFilter(firstFilter);
    return res;
  }

  gameTypeFilter(data) {
    const { gameFilter } = this.state;
    const gameMap = gameFilter.reduce((acc: object, cur) => {
      acc[cur.name] = cur.select;
      return acc;
    }, {});
    return data.filter(it => gameMap[it.game_type]);
  }

  matchFilter(data) {
    const { leagueFilter } = this.state;
    
  }

  filterList(gameType: string) {
    if (gameType === "ALL") {
      return initFilter;
    } else {
      return initFilter.filter(game => game.name === gameType.toLocaleLowerCase());
    }
  }

  selectFilterGame(game: any, idx: number) {
    const gameFilter = [...this.state.gameFilter];
    const newGame = {
      ...game,
      select: !game.select,
    };
    gameFilter[idx] = newGame;
    this.setState({
      gameFilter,
    });
  }
  
  render() {
    const { gameFilter } = this.state;
    const { upcommingList } = this.props;
    
    return (
      <div className="match-panel eyes_card">
        <GameFilter
          onSelect={(game: object, idx: number) => this.selectFilterGame(game, idx)}
          gameList={gameFilter}
        />
        <Tabs
          className="match-panel"
          tabBarGutter={48}
          tabBarStyle={{ border: 'none', lineHeight: '40px' }}
          defaultActiveKey="0"
        >
          <TabPane tab="赛事预告" key="0">
            <Card
              title={
                <span>
                  <img className="align-middle" width={20} height={20} src={imgSet.leagueSelect[0]} alt=""/>
                  <span>联赛</span>
                </span>
              }
              bordered={false}
              extra={
                <span>
                  <img className="align-middle" width={20} height={20} src={imgSet.deleteIcon} alt=""/>
                  <span>清除</span>
                </span>
              }
              className="league_filter"
            >{

            }
            </Card>
            123
          </TabPane>
          <TabPane tab="赛事结果" key="1">
            123
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
 
export default connect(
  (state: any) => state.global
)(MatchPanel);
