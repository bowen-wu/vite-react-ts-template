import React from 'react';
import scopedClasses from '../../utils/scopedClasses';

import './index.scss';

const sc = scopedClasses('home');

const Home = () => {
  return <div className={sc()}>This is Home Page</div>;
};

export default Home;
