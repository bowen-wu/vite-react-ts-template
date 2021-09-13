import React, { useState } from 'react';
import ProLayout from '@ant-design/pro-layout';
import Routers from '../routers';
import routerConfig from '../routers/routeConfig';
import scopedClasses from '../utils/scopedClasses';
import { useHistory } from 'react-router-dom';

const sc = scopedClasses('layout');

const Layout = () => {
  const history = useHistory();
  const [pathname, setPathname] = useState('/');

  return (
    <ProLayout
      route={{ path: '/', routes: routerConfig }}
      location={{ pathname }}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path || '/');
            history.push(item.path || '/');
          }}
        >
          {dom}
        </a>
      )}
    >
      <div className={sc()}>
        <Routers />
      </div>
    </ProLayout>
  );
};

export default Layout;
