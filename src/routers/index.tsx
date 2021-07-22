import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routerConfig, { RouterConfigInterface } from './routeConfig';

const Routers = () => (
    <BrowserRouter>
        <Switch>
            {
                routerConfig.map((router: RouterConfigInterface) => <Route exact
                                                                           key={router.key}
                                                                           path={router.path}
                                                                           component={router.component}/>)
            }
        </Switch>
    </BrowserRouter>
);

export default Routers;


