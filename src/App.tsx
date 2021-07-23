import React, { useReducer } from 'react';
import scopedClasses from './utils/scopedClasses';
import Layout from './layouts/layout';
import Routers from './routers';
import store from './stroes/store';
import Context from './stroes/context';
import { storeReducer } from './stroes/reducers';

import './App.scss';

const sc = scopedClasses('App');

const App = () => {
    const [ state, dispatch ] = useReducer(storeReducer, store);
    return (
        <div className={sc()}>
            <Context.Provider value={[state, dispatch]}>
                <Layout>
                    <Routers/>
                </Layout>
            </Context.Provider>
        </div>
    );
};

export default App;
