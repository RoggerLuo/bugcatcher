import React from 'react';
import s from './AppLayout.css';
import { Button, Layout, Row, Col } from 'antd';
import AppHeader from './AppHeader';

const Header = Layout.Header
const Footer = Layout.Footer
const Content = Layout.Content
const Sider = Layout.Sider

function MyLayout({ children, color }) {
    let contentStyle
    if (color) {
        contentStyle = { backgroundColor: color }
    } else {
        contentStyle = { display: 'block' }
    }
    return (
        <Layout className={s.layout}>
          <Header className={s.header}>
            <AppHeader />
          </Header>
          <Layout className={s.layoutContent}>
            <Content className={s.body} style={contentStyle}>
              {children}
            </Content>
          </Layout>
        </Layout>
    );
}
//          <Footer className={s.footer}>Bug Catcher</Footer>

export default MyLayout;
