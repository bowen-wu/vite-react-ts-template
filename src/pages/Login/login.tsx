import React from 'react';
import { useHistory } from 'react-router-dom';
import scopedClasses from '../../utils/scopedClasses';

import './index.scss';
const sc = scopedClasses('login');

const Login = () => {
    const history = useHistory();
    return (
        <div className={sc()}>
            This is Login Page
            <div onClick={() => history.push('/')}>Skip Home</div>
        </div>
    )
}

export default Login;
