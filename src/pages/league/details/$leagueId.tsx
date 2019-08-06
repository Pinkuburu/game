import React from 'react';
import { RouteComponentProps } from 'react-router';
import { globalDispatch } from '@/utils';
import { ActionType, NAMESPACE } from '../constant';

interface IProps extends RouteComponentProps<{ leagueId: string }> {}

export default class LeagueDetail extends React.Component<IProps> {
  componentDidMount() {
    const { leagueId = 0 } = this.props.match.params;
    console.log(leagueId);
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.get_league_info}`,
      payload: { leagueId }
    });
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.get_league_schedules}`,
      payload: { leagueId }
    });
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.get_league_rules}`,
      payload: { leagueId }
    });
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.get_league_brackets}`,
      payload: { leagueId }
    });
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.get_league_partition}`,
      payload: { leagueId }
    });
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.get_league_odds_winrate}`,
      payload: { leagueId }
    });
    globalDispatch({
      type: `${NAMESPACE.LEAGUE_DETAILS}/${ActionType.get_league_special_data}`,
      payload: { leagueId }
    });
  }
  render() {
    return <div>asdasd</div>;
  }
}
