/**
 * 1. Avatar DownDrop
 * 2. router config layout false not working
 * 3. skip to login page when not login
 */
import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import routerConfig from '../routers/routeConfig';
import scopedClasses from '../utils/scopedClasses';
import { useHistory } from 'react-router-dom';
import { Route } from '@ant-design/pro-layout/lib/typings';
import Header from './Header';
import { match } from 'react-router';
import Routers from '../routers';
import './layout.scss';

const sc = scopedClasses('layout');

interface LayoutProps {
  computedMatch: match;
  location: Location;
}

const Layout = ({ location: { pathname } }: LayoutProps) => {
  const history = useHistory();
  const getMatchRouter = (routerList: Route[], path: string) => {
    let targetRouter = null;
    routerList.some((item) => {
      if (item.path === path) {
        targetRouter = item;
      } else if (item.routes && item.routes.length > 0) {
        targetRouter = getMatchRouter(item.routes, path);
      } else {
        targetRouter = null;
      }
      if (targetRouter) {
        return true;
      }
    });
    return targetRouter;
  };
  const targetRouter: Route | null = getMatchRouter(routerConfig, pathname);

  // const isLogin = JSON.parse(sessionStorage.getItem('loginStatus'));

  // if (pathname === "/") {
  //     return <Redirect to="/user/login"/>;
  // }

  if (!targetRouter) {
    history.push('/404');
    return null;
  }

  return (
    <div className={sc()}>
      {(targetRouter as Route).layout === false ? (
        <Routers />
      ) : (
        <ProLayout
          route={{ path: '/', routes: routerConfig }}
          location={{ pathname: pathname }}
          menuHeaderRender={() => <div style={{ color: '#fff' }}>左上角标题</div>}
          headerRender={() => <Header />}
          footerRender={() => <div className={sc('footer')}>This is footer</div>}
          menuItemRender={(item, dom) => (
            <a onClick={() => history.push(item.path || '/')}>{dom}</a>
          )}
        >
          <Routers />
        </ProLayout>
      )}
    </div>
  );
};

export default Layout;
