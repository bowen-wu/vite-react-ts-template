import type { CSSProperties } from 'react';
import React, { Fragment, useContext, useState } from 'react';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined
} from '@ant-design/icons';
import { message, Space, Tabs } from 'antd';
import scopedClasses from '../../../utils/scopedClasses';
import './login.scss';
import { useHistory } from 'react-router-dom';
import Context from '../../../stores/context';
import { UserActionTypeEnum } from '../../../stores/user.store';

type LoginType = 'phone' | 'account';

interface LoginWithAccountParams {
  username: string;
  password: string;
}

interface LoginWithPhoneParams {
  phone: string;
  captcha: string;
}

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer'
};
const sc = scopedClasses('login');

const Login = () => {
  const history = useHistory();
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const [, dispatch] = useContext(Context);

  const onLogin = (values: LoginWithAccountParams | LoginWithPhoneParams) => {
    sessionStorage.setItem('user', JSON.stringify(values));
    dispatch({
      type: UserActionTypeEnum.UPDATE_USER_INFO,
      payload: {
        loginStatus: true,
        name: (values as LoginWithAccountParams).username || (values as LoginWithPhoneParams).phone
      }
    });
    return Promise.resolve().then(() => {
      history.push('/');
    });
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100%' }} className={sc()}>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大同性交友网站"
        actions={
          <Space>
            其他登录方式
            <AlipayCircleOutlined style={iconStyles} />
            <TaobaoCircleOutlined style={iconStyles} />
            <WeiboCircleOutlined style={iconStyles} />
          </Space>
        }
        onFinish={onLogin}
      >
        <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <Fragment>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!'
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！'
                }
              ]}
            />
          </Fragment>
        )}
        {loginType === 'phone' && (
          <Fragment>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！'
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！'
                }
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />
              }}
              captchaProps={{
                size: 'large'
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！'
                }
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </Fragment>
        )}
        <div style={{ marginBottom: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a style={{ float: 'right' }}>忘记密码</a>
        </div>
      </LoginForm>
    </div>
  );
};

export default Login;
