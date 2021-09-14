/**
 * 1. Avatar DownDrop
 * 2. router config layout false not working
 * 3. skip to login page when not login
 */
import React, { useState } from 'react';
import ProLayout from '@ant-design/pro-layout';
import Routers from '../routers';
import routerConfig from '../routers/routeConfig';
import scopedClasses from '../utils/scopedClasses';
import { useHistory } from 'react-router-dom';
import { Route } from '@ant-design/pro-layout/lib/typings';
import './layout.scss';
import Header from './Header';

const sc = scopedClasses('layout');

const Layout = () => {
  const history = useHistory();
  const [currentRoute, setCurrentRoute] = useState<Route>({ path: '/' });

  return (
    <div className={sc()}>
      <ProLayout
        route={{ path: '/', routes: routerConfig }}
        location={{ pathname: currentRoute.path }}
        menuHeaderRender={() => <div style={{ color: '#fff' }}>左上角标题</div>}
        headerRender={() => <Header />}
        footerRender={() => <div className={sc('footer')}>This is footer</div>}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setCurrentRoute(item || { path: '/' });
              history.push(item.path || '/');
            }}
          >
            {dom}
          </a>
        )}
      >
        <Routers />
      </ProLayout>
    </div>
  );
};

export default Layout;
