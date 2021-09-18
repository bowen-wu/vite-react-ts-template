import React, { useContext } from 'react';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useHistory } from 'react-router-dom';
import Context from '../../../stores/context';
import { Tooltip } from 'antd';
import { UserActionTypeEnum } from '../../../stores/user.store';
import scopedClasses from '../../../utils/scopedClasses';
import Account from '../../../assets/images/login/account.svg';
import Password from '../../../assets/images/login/password.svg';
import { login } from '../../../utils/utils';
import './login.scss';

interface LoginWithAccountParams {
  username: string;
  password: string;
  rememberAccount: boolean;
}

const sc = scopedClasses('login');

const Login = () => {
  const history = useHistory();
  const [, dispatch] = useContext(Context);
  const localUser = localStorage.getItem('user');

  const onLogin = ({ username, rememberAccount }: LoginWithAccountParams) => {
    // TODO: Login Interface & save token to localStorage
    login({ username, rememberAccount, token: 'tempToken' });
    dispatch({
      type: UserActionTypeEnum.UPDATE_USER_INFO,
      payload: {
        loginStatus: true,
        username
      }
    });
    return Promise.resolve().then(() => {
      history.push('/');
    });
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100%' }} className={sc()}>
      <LoginForm
        title={__TITLE__}
        onFinish={onLogin}
        submitter={{
          searchConfig: {
            submitText: '登录'
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%'
            },
            'aria-label': 'login'
          }
        }}
      >
        <ProFormText
          initialValue={
            localUser && JSON.parse(localUser).rememberAccount ? JSON.parse(localUser).username : ''
          }
          name="username"
          fieldProps={{
            size: 'large',
            prefix: (
              <div className={sc('prefix')}>
                <img src={Account} alt="" />
              </div>
            ),
            'aria-label': 'account'
          }}
          placeholder="请输入账号"
          rules={[{ required: true, message: '请输入账号！' }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            visibilityToggle: false,
            prefix: (
              <div className={sc('prefix')}>
                <img src={Password} alt="" />
              </div>
            ),
            'aria-label': 'password'
          }}
          placeholder="请输入密码"
          rules={[{ required: true, message: '请输入密码！' }]}
        />
        <div style={{ marginBottom: 24 }}>
          <ProFormCheckbox
            noStyle
            name="rememberAccount"
            initialValue={localUser ? JSON.parse(localUser).rememberAccount : false}
          >
            记住账号
          </ProFormCheckbox>
          <div style={{ float: 'right', cursor: 'pointer' }}>
            <Tooltip title="请联系超级管理员/客服找回">
              <span>忘记账号/密码</span>
            </Tooltip>
          </div>
        </div>
      </LoginForm>
    </div>
  );
};

export default Login;
