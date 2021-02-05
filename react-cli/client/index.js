import PropTypes from 'prop-types';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Login from '@pages/login';
import Home from '@pages/home';
import Header from '@layout/Header';
import SideBar from '@layout/SideBar';
import './index.less';

const { Content } = Layout;

const RenderRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <AuthorizedRoute path="/" component={RenderPage} />
  </Switch>
);

const AuthorizedRoute = ({ component: Component }) => {
  //   const isLogin =
  //     localStorage.getItem('userData') && cookie.get('userData') ? true : false;
  const isLogin = false; // 此处判断用户登录状态，控制路由跳转
  return (
    <Route
      render={() => (isLogin ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

AuthorizedRoute.propTypes = {
  component: PropTypes.func,
};

@withRouter
class RenderPage extends React.Component {
  render() {
    return (
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Layout className="site-layout">
            <SideBar />
            <Content style={{ margin: '0 16px' }}>
              <div className="my-wrap-content">
                <Switch>
                  <Route exact path="/home" component={Home} />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <RenderRouter />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('app')
);
