import React from 'react';
import { Layout } from 'antd';
import MenuSide from './MenuSide';
import Header from './Header';

import './layout.less';
import './index.css';

const { Footer, Content } = Layout;

const BasicLayout: React.FC = props => {
  return (
    <Layout className="web-page" style={{ minHeight: '100vh' }}>
      <MenuSide />
      <Layout className="web-page">
        <Header>这里是头部</Header>
        <Content style={{ padding: '20px' }}>{props.children}</Content>
        <Footer>这里是底部</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
