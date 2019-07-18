import React from 'react';
import { Card } from 'antd';
import { CustomCheckbox } from '../../../../../components/atoms/CheckBox';
import Image from '../../../../../components/atoms/Image';
import ImgStore from '../../../../../components/atoms/Image/imgStore';
import styles from './styles.less';
import * as DataType from '../../../../../common/interfaces/dataType';
// import classnames from 'classnames';

interface IProps {
  leagueList: DataType.LeagueInfo[];
}
export default class SelectLeague extends React.PureComponent<IProps> {
  static defaultProps = {
    leagueList: []
  };

  buildCheckAll() {
    return <CustomCheckbox className={styles.mediumFont}>联赛</CustomCheckbox>;
  }
  buildClearAll() {
    return (
      <Image src={ImgStore.deleteIcon} text="清除" spacing={2} textClassName={styles.mediumFont} />
    );
  }

  buildCheckboxItem(league: DataType.LeagueInfo) {
    return (
      <div className={styles.checkboxItem} key={league.league_id}>
        <CustomCheckbox>
          <Image
            src={league.league_img_url}
            width={26}
            height={26}
            text={league.league_name}
            spacing={5}
            textClassName={styles.demiFont}
          />
        </CustomCheckbox>
        <span className={styles.demiFont}>{league.count}</span>
      </div>
    );
  }

  render() {
    const { leagueList } = this.props;

    return (
      <div className={styles.selectLeague}>
        <Card title={this.buildCheckAll()} extra={this.buildClearAll()}>
          {leagueList.length ? (
            leagueList.map((item) => this.buildCheckboxItem(item))
          ) : (
            <div className={styles.noLeagues}>暂无联赛</div>
          )}
        </Card>
      </div>
    );
  }
}
