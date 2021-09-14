import React from 'react';
import scopedClasses from '../../utils/scopedClasses';
import HeaderRightContent from '../HeaderRightContent';
import './index.scss';

const sc = scopedClasses('layout-header');

const Header = () => {
  return (
    <div className={sc()}>
      <div className={sc('title')}>这是标题</div>
      <div className={sc('content')}>
        <HeaderRightContent />
      </div>
    </div>
  );
};

export default Header;
