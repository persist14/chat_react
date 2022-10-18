import { LaptopOutlined, UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Fragment } from 'react'
import { query } from '../utils/localStorage';
import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router'
import styles from './app.scss'
const { Header, Content, Sider } = Layout;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `chat${index}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const App = ({children, history, location}) => {
  const handlerMenuClick = ({key}) => {
    history.push(key)
  }
  let hasPermission = query('token')
  // 用来判断是不是登录页面
  let isLogin = location.pathname === '/login' ? true : false
  return (
    <Fragment>
     { isLogin ? children : ( <Layout  className={styles.layout} >
      <Header className="header">
        <div className={styles.logo} />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onClick={handlerMenuClick}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className={styles.content}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {hasPermission ? children : null}
          </Content>
        </Layout>
      </Layout>
    </Layout>)}
    </Fragment>
   
);}
export default withRouter(connect()(App));