import React, { useContext, useState, Fragment } from 'react';
import { Dropdown, Menu } from 'antd';
import scopedClasses from '../../utils/scopedClasses';
import DefaultAvatar from '../../assets/images/avatar_default.svg';
import { useHistory } from 'react-router-dom';
import Context from '../../stores/context';
import { UserActionTypeEnum, UserState } from '../../stores/user.store';
import { storageRemoveLoginInfo } from '../../utils/utils';
import ModifyPassword from '../../assets/images/layout/modify_password.svg';
import Logout from '../../assets/images/layout/logout.svg';
import './index.scss';
import { BaseProps } from '../layout';

const sc = scopedClasses('layout-header-avatar-dropdown');

const HeaderAvatarDropdown = (props: BaseProps) => {
  const history = useHistory();
  const localUser = localStorage.getItem('user');
  const [isAdmin] = useState(true);
  const [{ user }, dispatch] = useContext(Context);
  const userInfo: UserState = localUser ? JSON.parse(localUser) : user;

  const onLogout = () => {
    // TODO: fetch interface
    storageRemoveLoginInfo();
    dispatch({ type: UserActionTypeEnum.INITIAL_USER_INFO });
    history.push('/user/login');
  };

  const menu = (
    <Menu className={sc('menu')}>
      <Menu.Item key="info">
        <div className={sc('menu-info')}>
          {isAdmin ? (
            <div className={sc('menu-info-text')}>超级管理员</div>
          ) : (
            <Fragment>
              <div className={sc('menu-info-text')}>管理员</div>
              <div className={sc('menu-info-personal')}>{userInfo.username}</div>
              <div className={sc('menu-info-personal')}>{userInfo.mobile}</div>
              <div className={sc('menu-info-personal')}>{userInfo.department}</div>
            </Fragment>
          )}
        </div>
      </Menu.Item>
      <Menu.Item key="modifyPassword">
        <div onClick={props.onModifyPassword} className={sc('menu-item')}>
          <div className={sc('menu-item-icon')}>
            <img src={ModifyPassword} alt="" />
          </div>
          <div className={sc('menu-item-text')}>修改密码</div>
        </div>
      </Menu.Item>
      <Menu.Item key="logout">
        <div onClick={onLogout} className={sc('menu-item')}>
          <div className={sc('menu-item-icon')}>
            <img src={Logout} alt="" />
          </div>
          <div className={sc('menu-item-text')}>退出登录</div>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={sc()}>
      <Dropdown overlay={menu} placement="bottomCenter">
        <div className={sc('trigger')}>
          <div className={sc('trigger-avatar')}>
            <img src={DefaultAvatar} alt="" />
          </div>
          <div className={sc('trigger-name')}>{userInfo.username}</div>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderAvatarDropdown;
