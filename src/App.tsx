import * as React from 'react';
import { useReducer } from 'react';
import scopedClasses from './utils/scopedClasses';
import Layout from './layouts/layout';
import initializeStore from './stores/initializeStore';
import Context from './stores/context';
import { storeReducer } from './stores/reducers';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.less';

import './App.scss';

const sc = scopedClasses('App');

const App = () => {
  const [state, dispatch] = useReducer(storeReducer, initializeStore);
  return (
    <div className={sc()}>
      <Context.Provider value={[state, dispatch]}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
