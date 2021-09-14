import React from 'react';
import { Dropdown, Menu } from 'antd';
import scopedClasses from '../../utils/scopedClasses';
import DefaultAvatar from '../../assets/images/avatar_default.svg';
import './index.scss';

const sc = scopedClasses('layout-header-avatar-dropdown');

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const HeaderAvatarDropdown = () => {
  return (
    <div className={sc()}>
      <Dropdown overlay={menu} placement="bottomCenter">
        <div className={sc('trigger')}>
          <div className={sc('trigger-avatar')}>
            <img src={DefaultAvatar} alt="" />
          </div>
          <div className={sc('trigger-name')}>admin</div>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderAvatarDropdown;
