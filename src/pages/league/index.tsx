/**
 * title: 联赛列表
 */
import React from 'react';
import LeagueTable from './components/LeagueTable';
import HeroStatistics from './components/HeroStatistics';
import OddsStatistics from './components/OddsStatistics';

interface IProps {}

export default class LeaguePage extends React.Component<IProps> {
  render() {
    return (
      <div>
        <LeagueTable />
        <HeroStatistics />
        <OddsStatistics />
      </div>
    );
  }
}
