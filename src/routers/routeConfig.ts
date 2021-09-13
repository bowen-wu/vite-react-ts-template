import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import Admin from '../pages/Admin';
import Welcome from '../pages/Welcome';
import ListTableList from '../pages/ListTableList';
import { Route } from '@ant-design/pro-layout/lib/typings';

const routerConfig: Route[] = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/welcome',
    name: '欢迎',
    component: Welcome
  },
  {
    path: '/test',
    name: '测试',
    routes: [
      {
        path: '/test/sub-page',
        name: '测试-1',
        component: Admin
      },
      {
        path: '/test/sub-page2',
        name: '测试-2',
        component: ListTableList
      }
    ]
  },
  {
    path: '/thisistest',
    name: '管理页',
    routes: [
      {
        path: '/thisistest/sub-page1',
        name: '一级页面',
        component: Welcome
      },
      {
        path: '/thisistest/sub-page2',
        name: '二级页面',
        component: ListTableList
      },
      {
        path: '/thisistest/sub-page3',
        name: '三级页面',
        component: Admin
      }
    ]
  },
  {
    name: '列表页',
    path: '/list',
    routes: [
      {
        path: '/list/sub-page',
        name: '一级列表页面',
        routes: [
          {
            path: '/list/sub-page/sub-sub-page1',
            name: '一一级列表页面',
            component: ListTableList
          },
          {
            path: '/list/sub-page/sub-sub-page2',
            name: '一二级列表页面',
            component: ListTableList
          },
          {
            path: '/list/sub-page/sub-sub-page3',
            name: '一三级列表页面',
            component: ListTableList
          }
        ]
      },
      {
        path: '/list/sub-page2',
        name: '二级列表页面',
        component: ListTableList
      },
      {
        path: '/list/sub-page3',
        name: '三级列表页面',
        component: ListTableList
      }
    ]
  }
];

export default routerConfig;
