import React from 'react';
import { GameTypeEnum } from '../../../common/enums';
import { GameInfo } from '../../../common/constants';
import { Layout, Menu } from 'antd';
import { ActionType, NAMESPACE } from '../../../models/constants';
import { connect } from 'dva';
import Image from '../../../components/atoms/Image';
import ImageStore from '../../../components/atoms/Image/imgStore';
import LoginModal from '../../../components/modals/Login';
import CustomDropdown from '../../../components/molecules/Dropdown';
import styles from './styles.less';
import classnames from 'classnames';

interface IProps {
  dispatch: any;
  isLogined: boolean;
  gameType: GameTypeEnum;
}

class Header extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.handleGameListItemClick = this.handleGameListItemClick.bind(this);
  }

  showLoginModal(activeKey: 'login' | 'register') {
    this.props.dispatch({
      type: `${NAMESPACE.GLOBAL}/${ActionType.change_modal_r}`,
      payload: <LoginModal defaultActiveKey={activeKey} />
    });
  }

  handleGameListItemClick({ key }: { key: string }) {
    this.props.dispatch({
      type: `${NAMESPACE.GLOBAL}/${ActionType.change_game_type_r}`,
      payload: key as GameTypeEnum
    });
  }

  render() {
    const { isLogined, gameType } = this.props;
    return (
      <div className={styles.headerContainer}>
        <Layout.Header className="layout-header">
          <CustomDropdown
            overlay={this.buildGameList(gameType)}
            placement="bottomCenter"
            trigger={['click']}
          >
            {this.buildGameTypeIcon(gameType, styles.currentGameType)}
          </CustomDropdown>
          {isLogined ? this.buildAfterLogined() : this.buildBeforeLogined()}
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
  buildAfterLogined() {
    return <Image src={ImageStore.userImg} text="用户" />;
  }
  buildGameTypeIcon(gameType: GameTypeEnum, className?: string) {
    return (
      <Image
        src={GameInfo[gameType].icon}
        text={GameInfo[gameType].text}
        className={className}
        width={22}
        height={22}
      />
    );
  }

  buildUserList() {
    return (
      <Menu>
        {userList.map((item) => (
          <Menu.Item key={item.name}>
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
  gameType: state.global.gameType
}))(Header);

const gameList: GameTypeEnum[] = [
  GameTypeEnum.ALL,
  GameTypeEnum.DOTA2,
  GameTypeEnum.LOL,
  GameTypeEnum.CSGO
];
const userList = [
  {
    name: '个人中心'
  },
  {
    name: '退出登录'
  }
];
