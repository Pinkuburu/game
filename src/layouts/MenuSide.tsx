import React from 'react';
import { Menu, Layout } from 'antd';
import { NavLink, Link } from 'umi';
import imgSet from '../utils/imgStore';

import className from 'classnames';
import constant from '../constant';

import './menu.less';

const moduleList = [
  {
    name: '赛程',
    path: '/',
    icon: [imgSet.menuList[0], imgSet.fade_menuList[0]]
  },
  {
    name: '联赛',
    path: '/league',
    icon: [imgSet.menuList[1], imgSet.fade_menuList[1]]
  },
  {
    name: '战队',
    path: '/team',
    icon: [imgSet.menuList[2], imgSet.fade_menuList[2]]
  },
  {
    name: '选手',
    path: '/player',
    icon: [imgSet.menuList[3], imgSet.fade_menuList[3]]
  },
  {
    name: '预测',
    path: '/predict',
    icon: [imgSet.menuList[4], imgSet.fade_menuList[4]]
  }
];

const MenuSide = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Layout.Sider
      collapsible={true}
      collapsed={!open}
      className="menu-side"
      collapsedWidth={40}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      trigger={null}
      width="185"
    >
      <Link className="logo" to="/" style={{ backgroundImage: imgSet.logo }} />
      <Menu
        mode="inline"
        inlineIndent={40}
        selectable={false}
        style={{ background: constant.item_second, border: 'none' }}
      >{
        moduleList.map(module => (
          <Menu.Item
            className="menu-list-item m-b-10 p-0"
            key={module.name}
          >
            <NavLink
              activeClassName="cur-link"
              className={className('nav-link', { close: !open })}
              exact={true}
              to={module.path}
            >
              <img
                src={module.icon[(open || window.location.pathname === module.path) ? 0 : 1]}
                alt=""
                height="40"
                width="40"
                className="m-r-20"
              />
              {module.name}
            </NavLink>
          </Menu.Item>
        ))
      }
      </Menu>
    </Layout.Sider>
  );
};

export default MenuSide;
