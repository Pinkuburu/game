import React from 'react';
import { RouteComponentProps } from 'react-router';
import { globalDispatch } from '@/utils';
import { ActionType, NAMESPACE } from '../constant';
import LeagueInfoPane from './components/LeagueInfoPane';
import LeagueSchedule from './components/LeagueSchedule';

interface IProps extends RouteComponentProps<{ leagueId: string }> {}

export default class LeagueDetail extends React.Component<IProps> {
  componentDidMount() {
    const { leagueId = 0 } = this.props.match.params;
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.get_league_info}`,
      payload: { leagueId }
    });
  }
  render() {
    return (
      <div>
        <LeagueInfoPane />
        <LeagueSchedule />
      </div>
    );
  }
}
