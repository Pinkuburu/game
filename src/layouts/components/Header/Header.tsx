import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Layout, Menu } from 'antd';
import classnames from 'classnames';
import { GameTypeEnum } from '@/common/enums';
import { GameInfo } from '@/common/constants';
import { ActionType, NAMESPACE } from '@/models/constants';
import Image from '@/components/atoms/Image';
import LoginModal from '@/components/modals/Login';
import CustomDropdown from '@/components/molecules/Dropdown';
import * as DataType from '@/common/interfaces/dataType';
import Avatar from '@/components/atoms/Avatar';
import styles from './styles.less';

interface IProps {
  dispatch: any;
  isLogined: boolean;
  gameType: GameTypeEnum;
  userInfo: DataType.UserInfo;
}

class Header extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.handleGameListItemClick = this.handleGameListItemClick.bind(this);
    this.handleUserListItemClick = this.handleUserListItemClick.bind(this);
  }

  showLoginModal(activeKey: 'login' | 'register') {
    this.props.dispatch({
      type: `${NAMESPACE.GLOBAL}/${ActionType.change_modal}`,
      payload: <LoginModal defaultActiveKey={activeKey} />
    });
  }

  handleGameListItemClick({ key }: { key: string }) {
    this.props.dispatch({
      type: `${NAMESPACE.GLOBAL}/${ActionType.change_game_type}`,
      payload: key as GameTypeEnum
    });
  }
  handleUserListItemClick({ key }: { key: string }) {
    switch (key as 'user' | 'logout') {
      case 'user':
        router.push('/user');
        break;
      case 'logout':
        this.props.dispatch({ type: `${NAMESPACE.AUTH}/${ActionType.do_logout}` });
        break;
    }
  }

  render() {
    const { isLogined, gameType, userInfo } = this.props;
    return (
      <div className={styles.headerContainer}>
        <Layout.Header className="layout-header">
          <CustomDropdown overlay={this.buildGameList(gameType)} placement="bottomCenter">
            {this.buildGameTypeIcon(gameType, styles.currentGameType)}
          </CustomDropdown>
          {isLogined ? this.buildAfterLogined(userInfo) : this.buildBeforeLogined()}
        </Layout.Header>
      </div>
    );
  }

  buildBeforeLogined() {
    return (
      <div className={styles.aboutLogin}>
        <span onClick={this.showLoginModal.bind(this, 'login')}>登录</span>
        <span onClick={this.showLoginModal.bind(this, 'register')}>注册</span>
      </div>
    );
  }
  buildAfterLogined(userInfo: DataType.UserInfo) {
    return (
      <CustomDropdown overlay={this.buildUserList()} placement="bottomCenter">
        <div className={styles.userInfo}>
          <Avatar src={userInfo.avatar} size={30} />
          <span>{userInfo.name}</span>
        </div>
      </CustomDropdown>
    );
  }
  buildGameTypeIcon(gameType: GameTypeEnum, className?: string) {
    return (
      <span>
        <Image
          src={GameInfo[gameType].icon}
          text={GameInfo[gameType].text}
          className={className}
          width={30}
          height={30}
        />
      </span>
    );
  }

  buildUserList() {
    return (
      <Menu>
        {userList.map((item) => (
          <Menu.Item key={item.key} onClick={this.handleUserListItemClick}>
            <span>{item.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
  buildGameList(currentGameType: GameTypeEnum) {
    return (
      <Menu>
        {gameList.map((gameType) => (
          <Menu.Item key={gameType} onClick={this.handleGameListItemClick}>
            {this.buildGameTypeIcon(
              gameType,
              classnames(styles.gameList, { [styles.active]: gameType === currentGameType })
            )}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
interface ConnectState {
  auth: any;
  global: any;
}

export default connect((state: ConnectState) => ({
  isLogined: state.auth.isLogined,
  gameType: state.global.gameType,
  userInfo: state.auth.userInfo
}))(Header);

const gameList: GameTypeEnum[] = [
  GameTypeEnum.ALL,
  GameTypeEnum.DOTA2,
  GameTypeEnum.LOL,
  GameTypeEnum.CSGO
];
const userList = [
  {
    name: '个人中心',
    key: 'user'
  },
  {
    name: '退出登录',
    key: 'logout'
  }
];
