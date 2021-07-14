import React from 'react';
import scopedClasses from './utils/scopedClasses';
import './App.scss';

const sc = scopedClasses('App');

function App() {
  return (
    <div className={sc()}>
        test
    </div>
  )
}

export default App
