import React from 'react';
import scopedClasses from './utils/scopedClasses';
import Layout from './layouts/layout';
import Routers from './routers';

import './App.scss';

const sc = scopedClasses('App');

function App() {
    return (
        <div className={sc()}>
            <Layout>
                <Routers/>
            </Layout>
        </div>
    );
}

export default App;
