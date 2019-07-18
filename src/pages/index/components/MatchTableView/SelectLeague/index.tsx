import React from 'react';
import { Card } from 'antd';
import { CustomCheckbox } from '../../../../../components/atoms/CheckBox';
import Image from '../../../../../components/atoms/Image';
import ImgStore from '../../../../../components/atoms/Image/imgStore';
import * as DataType from '../../../../../common/interfaces/dataType';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from './styles.less';

interface IProps {
  leagueList: DataType.LeagueInfo[];
}
interface IState {
  checkList: any[];
  isCheckAll: boolean;
}

const leagueKey = 'league_id';
// TODO:抽取组件
export default class SelectLeague extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      checkList: [],
      isCheckAll: false
    };
    this.buildCheckboxItem = this.buildCheckboxItem.bind(this);
    this.buildCheckAll = this.buildCheckAll.bind(this);
    this.buildClearAll = this.buildClearAll.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this);
    this.handleClearAllChange = this.handleClearAllChange.bind(this);
  }
  static defaultProps = {
    leagueList: []
  };

  isChecked(key: any) {
    return this.state.checkList.includes(key);
  }
  // 清空
  handleClearAllChange() {
    this.setState({
      isCheckAll: false,
      checkList: []
    });
  }

  handleCheckboxChange(e: CheckboxChangeEvent) {
    const { value, checked } = e.target;
    const { checkList } = this.state;
    const { leagueList } = this.props;
    const isCheckAll = checkList.length + (checked ? 1 : -1) === leagueList.length;
    if (checked) {
      this.setState({
        checkList: [...checkList, value],
        isCheckAll
      });
    } else {
      this.setState({
        checkList: checkList.filter((key) => key !== value),
        isCheckAll
      });
    }
  }

  // 全选
  handleCheckAllChange(e: CheckboxChangeEvent) {
    const { value, checked } = e.target;
    if (checked) {
      this.setState({
        checkList: value,
        isCheckAll: true
      });
    } else {
      this.setState({
        checkList: [],
        isCheckAll: false
      });
    }
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
        checked={this.state.isCheckAll}
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
