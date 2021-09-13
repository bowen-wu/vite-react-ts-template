import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { createBrowserHistory, Path } from 'history';
import '@testing-library/jest-dom/extend-expect';
import routerConfig from '../routeConfig';
import App from '../../App';
import { Route } from '@ant-design/pro-layout/lib/typings';

describe('Test Routers', () => {
  afterEach(cleanup);

  it('rendering a component that uses useLocation', () => {
    const listener = jest.fn();
    const isolateRouterConfig = routerConfig.filter((router) => router.path !== '/');
    const history = createBrowserHistory();
    history.listen(listener);
    const length = history.length;

    const getValidRoute: (routes: Route[]) => Route = (routes: Route[]) => {
      const randomRoute = routes[Math.floor(Math.random() * routes.length)];
      if (randomRoute.path) {
        return randomRoute;
      }
      return getValidRoute(randomRoute.routes as Route[]);
    };
    const route = getValidRoute(isolateRouterConfig);

    history.push(route.path as Path);
    expect(listener).toHaveBeenCalled();
    expect(history.length).toEqual(length + 1);
    const { container } = render(<App />);
    const { container: componentContainer } = render(route.component);
    expect(container).toBeInTheDocument();
    expect(componentContainer).toBeInTheDocument();
  });
});
