import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import routerConfig from './routeConfig';
import { Route as RouteInterface } from '@ant-design/pro-layout/lib/typings';

const renderRouter = (routers: RouteInterface[]) => {
  return (
    <Fragment>
      {routers.map((router: RouteInterface) => {
        const key = router.name ? `${router.path}-${router.name}` : router.path;

        if (router.routes && router.routes.length > 0) {
          return <Fragment key={key}>{renderRouter(router.routes)}</Fragment>;
        }

        return <Route exact key={key} path={router.path} component={router.component} />;
      })}
    </Fragment>
  );
};

const Routers = () => renderRouter(routerConfig);

export default Routers;
