import React from 'react';
import scopedClasses from '../../utils/scopedClasses';

const sc = scopedClasses('not-found');

const NotFound = () => {
  return <div className={sc()}>This is NotFound Page!</div>;
};

export default NotFound;
