import React from 'react';
import { Layout } from 'antd';
import MenuSide from './components/MenuSide/MenuSide';
import Header from './components/Header/Header';

import styles from './layout.less';

const { Footer, Content } = Layout;

interface Props {
  children: React.ReactNode;
}
const BasicLayout: React.FC<Props> = (props: Props) => {
  return (
    <Layout className={styles['web-page']}>
      <MenuSide />
      <Layout className={styles['web-page']}>
        <Header>这里是头部</Header>
        <Content style={{ padding: '20px' }}>{props.children}</Content>
        <Footer>这里是底部</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
