import React, { useContext, useRef, useState } from 'react';
import ProLayout from '@ant-design/pro-layout';
import ProForm, { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-form';
import routerConfig from '../routers/routeConfig';
import scopedClasses from '../utils/scopedClasses';
import { useHistory } from 'react-router-dom';
import { Route } from '@ant-design/pro-layout/lib/typings';
import Header from './Header';
import { match } from 'react-router';
import Routers from '../routers';
import Context from '../stores/context';
import { UserActionTypeEnum } from '../stores/user.store';
import { isLogged, storageRemoveLoginInfo } from '../utils/utils';
import './layout.scss';

const sc = scopedClasses('layout');

interface ModifyPasswordValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface BaseProps {
  onModifyPassword: () => void;
}

interface LayoutProps {
  computedMatch: match;
  location: Location;
}

const Layout = ({ location: { pathname } }: LayoutProps) => {
  const history = useHistory();
  const modifyPasswordFormRef = useRef<ProFormInstance<ModifyPasswordValues>>();
  const [modifyPasswordModalVisible, setModifyPasswordModalVisible] = useState<boolean>(false);
  const [, dispatch] = useContext(Context);
  const getMatchRouter = (routerList: Route[], path: string) => {
    let targetRouter = null;
    routerList.some((item) => {
      if (item.path === path) {
        targetRouter = item;
      } else if (item.routes && item.routes.length > 0) {
        targetRouter = getMatchRouter(item.routes, path);
      } else {
        targetRouter = null;
      }
      if (targetRouter) {
        return true;
      }
    });
    return targetRouter;
  };
  const targetRouter: Route | null = getMatchRouter(routerConfig, pathname);

  if (!targetRouter) {
    history.push('/404');
    return null;
  }

  const loginPath = '/user/login';
  const hasNotLoginYet = !isLogged() && (targetRouter as Route).path !== loginPath;
  if (hasNotLoginYet) {
    history.replace('/user/login');
  }

  if (isLogged() && (targetRouter as Route).path === loginPath) {
    history.replace('/');
  }

  const onModifyPassword = () => setModifyPasswordModalVisible(true);

  const onConfirmModifyPassword = async () => {
    // TODO: call modifyPassword Interface
    setModifyPasswordModalVisible(false);
    modifyPasswordFormRef.current?.resetFields();
    storageRemoveLoginInfo();
    dispatch({ type: UserActionTypeEnum.INITIAL_USER_INFO });
    history.push('/user/login');
  };

  return (
    <div className={sc()}>
      {(targetRouter as Route).layout === false ? (
        <Routers />
      ) : (
        <ProLayout
          route={{ path: '/', routes: routerConfig }}
          location={{ pathname: pathname }}
          menuHeaderRender={() => <div style={{ color: '#fff' }}>左上角标题</div>}
          headerRender={() => <Header onModifyPassword={onModifyPassword} />}
          footerRender={() => <div className={sc('footer')}>This is footer</div>}
          menuItemRender={(item, dom) => (
            <a onClick={() => history.push(item.path || '/')}>{dom}</a>
          )}
        >
          <Routers />
        </ProLayout>
      )}

      <ModalForm<ModifyPasswordValues>
        formRef={modifyPasswordFormRef}
        className={sc('modify-password')}
        title="修改密码"
        width={640}
        visible={modifyPasswordModalVisible}
        modalProps={{
          onCancel: () => setModifyPasswordModalVisible(false)
        }}
        onFinish={onConfirmModifyPassword}
      >
        <ProForm.Group>
          <ProFormText.Password
            name="oldPassword"
            width="md"
            fieldProps={{
              size: 'large',
              visibilityToggle: false,
              'aria-label': 'old-password'
            }}
            placeholder="旧密码"
            rules={[{ required: true, message: '请输入' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password
            name="newPassword"
            width="md"
            fieldProps={{
              size: 'large',
              visibilityToggle: false,
              'aria-label': 'new-password'
            }}
            placeholder="新密码，8～20位密码，区分大小写"
            rules={[{ required: true, message: '请输入密码！' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password
            name="confirmPassword"
            width="md"
            fieldProps={{
              size: 'large',
              visibilityToggle: false,
              'aria-label': 'confirm-password'
            }}
            placeholder="确认新密码"
            rules={[{ required: true, message: '请输入密码！' }]}
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
};

export default Layout;
