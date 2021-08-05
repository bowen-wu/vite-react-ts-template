import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import routerConfig from '../routeConfig';
import App from '../../App';

describe('Test Routers', () => {
  afterEach(cleanup);

  it('rendering a component that uses useLocation', () => {
    const isolateRouterConfig = routerConfig.filter((router) => router.path !== '/');
    const randomRoute = isolateRouterConfig[Math.floor(Math.random() * isolateRouterConfig.length)];
    const history = createBrowserHistory();
    history.push(randomRoute.path);
    const { container } = render(<App />);
    expect(container.querySelector(`div.${randomRoute.key}`)).toBeTruthy();
  });
});
