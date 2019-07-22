import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { ActionType } from '../../../models/constants';
import { connect } from 'dva';
import Image from '../../../components/atoms/Image';
import ImageStore from '../../../components/atoms/Image/imgStore';
import LoginModal from '../../../components/modals/Login';
import styles from './styles.less';

const gameList = [
  {
    name: 'ALL'
  },
  {
    name: 'DOTA2'
  },
  {
    name: 'LOL'
  },
  {
    name: 'CSGO'
  }
];

const userList = [
  {
    name: '个人中心'
  },
  {
    name: '退出登录'
  }
];
interface IProps {
  dispatch: any;
  isLogined: boolean;
  gameType: any;
}

class Header extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.showLoginModal = this.showLoginModal.bind(this);
  }

  showLoginModal() {
    this.props.dispatch({
      type: ActionType.change_modal_r_with_namespace,
      payload: <LoginModal />
    });
  }
  componentDidMount() {
    this.showLoginModal();
  }

  render() {
    const { gameType } = this.props;
    return (
      <div className={styles.container}>
        <Layout.Header className="layout-header">
          <Dropdown
            className="menu-item"
            overlay={this.buildGameList()}
            placement="bottomCenter"
            trigger={['click']}
          >
            <div>
              <img className="menu_icon mr-2" src={ImageStore.iconGame} alt=" " />
              {gameType}
            </div>
          </Dropdown>
          {this.buildLoginOrUserBtn()}
        </Layout.Header>
      </div>
    );
  }

  buildLoginOrUserBtn() {
    const { isLogined } = this.props;
    return isLogined ? null : (
      <Image
        src={ImageStore.userImg}
        text="用户"
        className="menu_icon mr-2"
        onClick={this.showLoginModal}
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
  buildGameList() {
    const { dispatch } = this.props;
    return (
      <Menu
        onClick={(item) => {
          dispatch({ type: 'global/selectType', payload: item.key });
        }}
      >
        {gameList.map((game) => (
          <Menu.Item key={game.name}>
            <span>{game.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
interface ConnectState {
  auth: any;
}

export default connect((state: ConnectState) => ({
  isLogined: state.auth.isLogined
}))(Header);
