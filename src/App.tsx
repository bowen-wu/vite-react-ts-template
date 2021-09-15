import * as React from 'react';
import { useReducer } from 'react';
import scopedClasses from './utils/scopedClasses';
import initializeStore from './stores/initializeStore';
import Context from './stores/context';
import { storeReducer } from './stores/reducers';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './layouts/layout';
import 'antd/dist/antd.less';

import './App.scss';

const sc = scopedClasses('App');

const App = () => {
  const [state, dispatch] = useReducer(storeReducer, initializeStore);
  return (
    <div className={sc()}>
      <Context.Provider value={[state, dispatch]}>
        <BrowserRouter>
          <Switch>
            {/*@ts-ignore TODO*/}
            <Layout />
          </Switch>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
