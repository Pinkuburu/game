import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { connect } from 'dva';
import imgSet from '../utils/imgStore';
import './header.less';

const gameList = [
  {
    name: 'ALL'
  },
  {
    name: 'DOTA2',
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
    name: "个人中心",
  },
  {
    name: "退出登录"
  }
]

class Header extends React.Component {
  getUserList() {
    return (
      <Menu>
        {userList.map(item => (
          <Menu.Item key={item.name}>
            <span>{item.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
  gameList() {
    const { dispatch } = this.props;    
    return (
      <Menu
        onClick={(item) => {

          dispatch({ type: 'global/selectType', payload: item.key })
        }}
      >
        {gameList.map(game => (
          <Menu.Item key={game.name}>
            <span>{game.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
  render() {
    const { gameType } = this.props;
    return (
      <Layout.Header className="layout-header">
        <Dropdown
          className="menu-item"
          overlay={this.gameList()}
          placement="bottomCenter"
          trigger={["click"]}
        >
          <div>
            <img className="menu_icon mr-2" src={imgSet.iconGame} alt=" "/>
            {gameType}
          </div>
        </Dropdown>
        <Dropdown
          className="menu-item"
          overlay={this.getUserList()}
          placement="bottomCenter"
        >
          <div>
            <img className="menu_icon mr-2" src={imgSet.userImg} alt=" "/>
            用户
          </div>
        </Dropdown>
      </Layout.Header>
    );
  }
}
 
export default connect((state: any) => state.global)(Header);
