import { FunctionComponent } from 'react';
import Home from '../pages/Home/home';
import Login from '../pages/Login/login';

export interface RouterConfigInterface {
    key: string;
    path: string;
    component: FunctionComponent;
}

const routerConfig: Array<RouterConfigInterface> = [
    {
        key: 'login',
        path: '/login',
        component: Login
    },
    {
        key: 'home',
        path: '/',
        component: Home
    }
];

export default routerConfig;
