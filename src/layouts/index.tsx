import React from 'react';
import { Layout } from 'antd';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import MenuSide from './components/MenuSide/MenuSide';
import Header from './components/Header/Header';
import Modal from './components/Modal';

import styles from './styles.less';

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}
const BasicLayout: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Layout className={styles['web-page']}>
        <MenuSide />
        <Layout className={styles['web-page']}>
          <Header>这里是头部</Header>
          <Content style={{ padding: '20px' }} className={styles.content}>
            {props.children}
          </Content>
          {/* <Footer>这里是底部</Footer> */}
        </Layout>
      </Layout>
      <Modal />
    </>
  );
};

export default withRouter(connect()(BasicLayout));
