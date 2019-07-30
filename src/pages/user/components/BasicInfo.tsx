import React from 'react';
import moment from 'moment';
import Avatar from '@/components/atoms/Avatar';
import Input from '@/components/atoms/Input';
import Image from '@/components/atoms/Image';
import ImgStore from '@/components/atoms/Image/imgStore';
import * as DataType from '@/common/interfaces/dataType';
import styles from './styles.less';
import { connect } from 'dva';

interface IProps {
  userInfo: DataType.UserInfo;
  userMemberInfo: DataType.UserMemberInfo[];
  readonly: boolean;
}
interface IState {
  canEditName: boolean;
  newName: string;
}

class BasicInfo extends React.Component<IProps, IState> {
  static defaultProps = {
    userInfo: {},
    userMemberInfo: [],
    readonly: true
  };
  Avatar: React.RefObject<Avatar>;
  constructor(props: IProps) {
    super(props);
    this.state = { canEditName: false, newName: '' };
    this.Avatar = React.createRef();
    this.handleEditIconClick = this.handleEditIconClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getBasicInfo = this.getBasicInfo.bind(this);
    this.resetCanEditName = this.resetCanEditName.bind(this);
  }

  handleEditIconClick() {
    const { canEditName } = this.state;
    this.setState({ canEditName: !canEditName, newName: '' });
  }
  handleInputChange(e: any) {
    const { value } = e.target;
    this.setState({ newName: value });
  }

  getBasicInfo() {
    const { newName } = this.state;
    const newAvatar = (this.Avatar.current && this.Avatar.current.state.imageUrl) || '';
    return { newName, newAvatar };
  }

  resetCanEditName() {
    this.setState({ canEditName: false });
  }

  render() {
    const { canEditName, newName } = this.state;
    const { userInfo, userMemberInfo, readonly } = this.props;
    const expiredTime = userMemberInfo.length
      ? moment.unix(userMemberInfo[0].expire).format('YYYY-MM-DD')
      : '无';
    const displayName = newName || userInfo.name || '用户名';
    const displayMobile = userInfo.mobile || '12345678910';
    return (
      <div className={styles.basicInfoContainer}>
        <Avatar src={userInfo.avatar} size={85} canReUpload={!readonly} ref={this.Avatar} />
        <div className={styles.textInfoContainer}>
          <div className={styles.name}>
            {readonly || !canEditName ? (
              displayName
            ) : (
              <Input
                value={newName}
                autoFocus={true}
                onChange={this.handleInputChange}
                maxLength={7}
                placeholder="昵称长度为1-7位"
              />
            )}
            {readonly || <Image src={ImgStore.edit} onClick={this.handleEditIconClick} />}
          </div>
          <div className={styles.mobAndTime}>
            <Image src={ImgStore.mobile} text={displayMobile} />
            <Image src={ImgStore.member} className={styles.timeLabel} text="会员到期时间：" />
            <span className={styles.expiredTime}>{expiredTime}</span>
          </div>
        </div>
      </div>
    );
  }
}

interface ConnectState {
  auth: any;
}

export default connect(
  (state: ConnectState) => ({
    userInfo: state.auth.userInfo,
    userMemberInfo: state.auth.userMemberInfo
  }),
  undefined,
  undefined,
  { withRef: true }
)(BasicInfo);
