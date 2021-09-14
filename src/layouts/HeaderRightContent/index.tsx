import React from 'react';
import scopedClasses from '../../utils/scopedClasses';
import NoticeDefault from '../../assets/images/notice_default.svg';
import './index.scss';
import HeaderAvatarDropdown from '../HeaderAvatarDropdown';

const sc = scopedClasses('layout-header-right-content');

const HeaderRightContent = () => {
  return (
    <div className={sc()}>
      <div className={sc('notice')}>
        <img src={NoticeDefault} alt="" />
      </div>
      <div className={sc('avatar')}>
        <HeaderAvatarDropdown />
      </div>
    </div>
  );
};

export default HeaderRightContent;
