import React from 'react';
import s from './AppLayout.css';
import c from '../assets/common.css';
import AppHeader from './AppHeader';

import {Layout,Row,Col} from 'antd';
import AppSider from './AppSider';

const Header=Layout.Header
const Footer=Layout.Footer
const Content=Layout.Content
const Sider=Layout.Sider

function MyLayout({children,color}) {
  let contentStyle
  if(color){
      contentStyle = {backgroundColor:color}
  }else{
      contentStyle = {display:'block'}
  }

  const onClick = function ({ key }) {
    message.info(`Click on item ${key}`);
  };

  return (
    <Layout className={s.layout}>
      <Header className={s.header}>
        <AppHeader />
      </Header>
      <Layout>
        <Sider className={s.sider}>
            <AppSider />
        </Sider>
        <Content className={s.body} style={contentStyle}>
            {children}
        </Content>
      </Layout>
    </Layout>
  );
}
export default MyLayout;
