import React, { useContext } from 'react';
import { Dropdown, Menu } from 'antd';
import scopedClasses from '../../utils/scopedClasses';
import DefaultAvatar from '../../assets/images/avatar_default.svg';
import { useHistory } from 'react-router-dom';
import './index.scss';
import Context from '../../stores/context';
import { UserActionTypeEnum } from '../../stores/user.store';

const sc = scopedClasses('layout-header-avatar-dropdown');

const HeaderAvatarDropdown = () => {
  const history = useHistory();
  const [{ user }, dispatch] = useContext(Context);
  const onLogout = () => {
    sessionStorage.clear();
    dispatch({ type: UserActionTypeEnum.INITIAL_USER_INFO });
    history.push('/user/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="first">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item key="second">
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item key="third">
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      </Menu.Item>
      <Menu.Item key="logout">
        <div onClick={onLogout}>退出登录</div>
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
          <div className={sc('trigger-name')}>{user.name}</div>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderAvatarDropdown;
