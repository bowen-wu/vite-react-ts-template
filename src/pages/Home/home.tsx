import React from 'react';
import scopedClasses from '../../utils/scopedClasses';
import { useHistory } from 'react-router-dom';

import './index.scss';

const sc = scopedClasses('home');

const Home = () => {
    const history = useHistory();
    return (
        <div className={sc()}>
            This is Home Page
            <div onClick={() => history.push('/login')}>Skip Login</div>
        </div>
    )
}

export default Home;
