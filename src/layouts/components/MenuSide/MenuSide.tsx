import React from 'react';
import { Menu, Layout } from 'antd';
import { NavLink, Link } from 'umi';
import ImageStore from '../../../components/atoms/Image/imgStore';
import styles from './styles.less';
import className from 'classnames';

const moduleList = [
  {
    name: '赛程',
    path: '/',
    icon: [ImageStore.menuList[0], ImageStore.fade_menuList[0]]
  },
  {
    name: '联赛',
    path: '/league',
    icon: [ImageStore.menuList[1], ImageStore.fade_menuList[1]]
  },
  {
    name: '战队',
    path: '/team',
    icon: [ImageStore.menuList[2], ImageStore.fade_menuList[2]]
  },
  {
    name: '选手',
    path: '/player',
    icon: [ImageStore.menuList[3], ImageStore.fade_menuList[3]]
  },
  {
    name: '预测',
    path: '/predict',
    icon: [ImageStore.menuList[4], ImageStore.fade_menuList[4]]
  }
];

const MenuSide = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      <Layout.Sider
        collapsible={true}
        collapsed={!open}
        className={styles['menu-side']}
        collapsedWidth={40}
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        trigger={null}
        width="185"
      >
        <Link className={styles.logo} to="/" style={{ backgroundImage: ImageStore.logo }} />
        <Menu mode="inline" inlineIndent={40} selectable={false} className={styles.menu}>
          {moduleList.map((module) => (
            <Menu.Item
              className={className(styles['menu-list-item'], 'm-b-10', 'p-0')}
              key={module.name}
            >
              <NavLink
                activeClassName={styles['cur-link']}
                className={className(styles['nav-link'], { close: !open })}
                exact={true}
                to={module.path}
              >
                <img
                  src={module.icon[open || window.location.pathname === module.path ? 0 : 1]}
                  alt=""
                  height="40"
                  width="40"
                  className="m-r-20"
                />
                {module.name}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
    </div>
  );
};

export default MenuSide;
