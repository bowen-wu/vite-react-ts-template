import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import routerConfig from './routeConfig';
import { Route as RouteInterface } from '@ant-design/pro-layout/lib/typings';

const renderRouter = (routers: RouteInterface[]) => {
  return (
    <Fragment>
      {routers.map((router: RouteInterface) => {
        if (router.routes && router.routes.length > 0) {
          return renderRouter(router.routes);
        }
        return <Route exact key={router.path} path={router.path} component={router.component} />;
      })}
    </Fragment>
  );
};

const Routers = () => <Switch>{renderRouter(routerConfig)}</Switch>;

export default Routers;
