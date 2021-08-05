import React, { useContext } from 'react';
import scopedClasses from '../../utils/scopedClasses';
import { useHistory } from 'react-router-dom';
import Context from '../../stores/context';
import { UserActionTypeEnum } from '../../stores/user.store';

import './index.scss';

const sc = scopedClasses('home');

const Home = () => {
  const history = useHistory();
  const [context, dispatch] = useContext(Context);
  const { user } = context;

  const onSwitchLoginStatus = () => {
    dispatch({
      type: UserActionTypeEnum.UPDATE_LOGIN_STATUE,
      payload: { loginStatus: !user.loginStatus }
    });
  };

  return (
    <div className={sc()}>
      This is Home Page
      <div onClick={() => history.push('/login')}>Skip Login</div>
      <h1>This is User info</h1>
      <div>name: {user.name}</div>
      <div>id: {user.id}</div>
      <div>
        LoginStatus:{' '}
        <button onClick={onSwitchLoginStatus}>{user.loginStatus ? 'Logout' : 'Login'}</button>
      </div>
    </div>
  );
};

export default Home;
