import React from 'react';
import { Card } from 'antd';
import { CustomCheckbox } from '../../../../../components/atoms/CheckBox';
import { ActionType } from '../../../constants';
import Image from '../../../../../components/atoms/Image';
import ImgStore from '../../../../../components/atoms/Image/imgStore';
import * as DataType from '../../../../../common/interfaces/dataType';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from './styles.less';
import { globalDispatch } from '../../../../../utils';

interface IProps {
  leagueList: DataType.LeagueInfo[];
  currentSelectedLeaguesId: number[];
}
interface IState {
  checkList: any[];
}

const leagueKey = 'league_id';
// TODO:抽取组件
export default class SelectLeague extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    leagueList: []
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      checkList: []
    };
    this.buildCheckboxItem = this.buildCheckboxItem.bind(this);
    this.buildCheckAll = this.buildCheckAll.bind(this);
    this.buildClearAll = this.buildClearAll.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.isAllChecked = this.isAllChecked.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this);
    this.handleClearAllChange = this.handleClearAllChange.bind(this);
  }

  isChecked(key: any) {
    const { currentSelectedLeaguesId } = this.props;
    return currentSelectedLeaguesId.includes(key);
  }
  isAllChecked() {
    const { leagueList, currentSelectedLeaguesId } = this.props;
    return leagueList.length !== 0 && leagueList.length === currentSelectedLeaguesId.length;
  }

  handleCheckboxChange(e: CheckboxChangeEvent) {
    const { value } = e.target;
    globalDispatch({
      type: ActionType.change_current_slected_leagueId_with_namespace,
      payload: {
        leagueId: value
      }
    });
  }

  // 清空
  handleClearAllChange() {
    globalDispatch({
      type: ActionType.change_current_slected_leagueId_with_namespace,
      payload: {
        isCheckAll: false
      }
    });
  }

  // 全选
  handleCheckAllChange(e: CheckboxChangeEvent) {
    const { checked, value } = e.target;
    globalDispatch({
      type: ActionType.change_current_slected_leagueId_with_namespace,
      payload: {
        isCheckAll: checked,
        allLeagueId: value
      }
    });
  }

  render() {
    const { leagueList } = this.props;
    return (
      <div className={styles.selectLeague}>
        <Card title={this.buildCheckAll(leagueList)} extra={this.buildClearAll()}>
          {leagueList.length ? (
            leagueList.map((item) => this.buildCheckboxItem(item))
          ) : (
            <div className={styles.noLeagues}>暂无联赛</div>
          )}
        </Card>
      </div>
    );
  }
  buildCheckAll(leagueList: DataType.LeagueInfo[]) {
    return (
      <CustomCheckbox
        className={styles.mediumFont}
        checked={this.isAllChecked()}
        onChange={this.handleCheckAllChange}
        value={leagueList.map((league) => league[leagueKey])}
      >
        联赛
      </CustomCheckbox>
    );
  }
  buildClearAll() {
    return (
      <Image
        src={ImgStore.deleteIcon}
        text="清除"
        spacing={2}
        textClassName={styles.mediumFont}
        onClick={this.handleClearAllChange}
      />
    );
  }

  buildCheckboxItem(league: DataType.LeagueInfo) {
    return (
      <div className={styles.checkboxItem} key={league[leagueKey]}>
        <CustomCheckbox
          checked={this.isChecked(league[leagueKey])}
          onChange={this.handleCheckboxChange}
          value={league[leagueKey]}
        >
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
}
