import React from 'react';
import { connect } from 'dva';
import StatisticsContainer from '../StatisticsContainer';
import { ActionType, NAMESPACE } from '../../constant';
import { GameTypeEnum } from '@/common/enums';
import * as DataType from '@/common/interfaces/dataType';
import styles from './styles.less';

interface IProps {
  dispatch: (action: { type: string; payload?: any }) => void;
  oddsStat: DataType.ClassifiedByGameType<any>;
}

class OddsStatistics extends React.PureComponent<IProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE.LEAGUE}/${ActionType.get_odds_stat}`,
      payload: { type: GameTypeEnum.DOTA2 }
    });
  }

  render() {
    return (
      <StatisticsContainer title="指数统计">
        <div>asdasd</div>
      </StatisticsContainer>
    );
  }
}

interface ConnectState {
  league: any;
}

export default connect((state: ConnectState) => ({
  oddsStat: state.league.oddsStat
}))(OddsStatistics);
