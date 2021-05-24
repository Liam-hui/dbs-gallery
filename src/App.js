import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Cover from '@/pages/Cover';
import Gallery from '@/pages/Gallery';
import LinesCanvas from '@/pages/LinesCanvas';

import '@/styles/styles.css';

function App() {

  const [isLandscape, setIsLandscape] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        setIsLandscape(window.innerWidth > window.innerHeight);
      }
    , 500)
  }, []); 

  //execute when resizing finish
  let resizeLoop;
  window.addEventListener("resize", () => {
    clearTimeout(resizeLoop);
    resizeLoop = setTimeout(doneResizing, 500);
  });
  const doneResizing = () => {
    setIsLandscape(window.innerWidth > window.innerHeight)
  }

  useEffect(() => {
    setTimeout(
      () => setCanScroll(isLandscape),
      isLandscape ? 2500 : 0
    )
  }, [isLandscape]); 

  return (
    <Provider store={store}>
      <div className={isLandscape ? 'isLandscape' : ''} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Gallery canScroll={canScroll}/>
        <Cover/>
      </div>
    </Provider>
  );
}

export default App;
