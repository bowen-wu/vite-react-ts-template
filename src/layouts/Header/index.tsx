import React from 'react';
import scopedClasses from '../../utils/scopedClasses';
import HeaderRightContent from '../HeaderRightContent';
import './index.scss';
import { BaseProps } from '../layout';

const sc = scopedClasses('layout-header');

const Header = (props: BaseProps) => {
  return (
    <div className={sc()}>
      <div className={sc('title')}>这是标题</div>
      <div className={sc('content')}>
        <HeaderRightContent onModifyPassword={props.onModifyPassword} />
      </div>
    </div>
  );
};

export default Header;
