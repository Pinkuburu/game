import React from 'react';
import moment from 'moment';
import Avatar from '../../../components/atoms/Avatar';
import Input from '../../../components/atoms/Input';
import Image from '../../../components/atoms/Image';
import ImgStore from '../../../components/atoms/Image/imgStore';
import * as DataType from '../../../common/interfaces/dataType';
import styles from './styles.less';

interface IProps {
  userInfo: DataType.UserInfo;
  userMemberInfo: DataType.UserMemberInfo[];
  readonly: boolean;
}
interface IState {
  readonly: boolean;
}

export default class BasicInfo extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    userInfo: {},
    userMemberInfo: [],
    readonly: true
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      readonly: true
    };
    this.handleEditIconClick = this.handleEditIconClick.bind(this);
  }

  handleEditIconClick() {
    this.setState({
      readonly: !this.state.readonly
    });
  }

  render() {
    const { readonly } = this.state;
    const { userInfo, userMemberInfo } = this.props;
    const expiredTime = userMemberInfo.length
      ? moment.unix(userMemberInfo[0].expire).format('YYYY-MM-DD')
      : '无';
    return (
      <div className={styles.basicInfoContainer}>
        <Avatar src={userInfo.avatar} size={85} canReUpload={!readonly} />
        <div className={styles.textInfoContainer}>
          <div className={styles.name}>
            {readonly ? userInfo.name : <Input value={userInfo.name} autoFocus={true} />}
            {readonly || <Image src={ImgStore.edit} onClick={this.handleEditIconClick} />}
          </div>
          <div className={styles.mobAndTime}>
            <Image src={ImgStore.mobile} text={userInfo.mobile} />
            <Image src={ImgStore.member} className={styles.timeLabel} text="会员到期时间：" />
            <span className={styles.expiredTime}>{expiredTime}</span>
          </div>
        </div>
      </div>
    );
  }
}
