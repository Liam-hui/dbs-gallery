import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Cover from '@/pages/Cover';
import Gallery from '@/pages/Gallery';
import LightBox from '@/pages/LightBox';

import '@/styles/styles.css';

function App() {

  const [isLandscape, setIsLandscape] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const setBgHeight = () => {
    document.getElementById('bg-start').style.height = window.innerHeight + 'px';
  }

  useEffect(() => {
    setBgHeight();
    setTimeout(
      () => setIsLandscape(window.innerWidth > window.innerHeight)
    , 500)
  }, []); 

  //execute when resizing finish
  let resizeLoop;
  window.addEventListener("resize", () => {
    setBgHeight();
    clearTimeout(resizeLoop);
    resizeLoop = setTimeout(doneResizing, 500);
  });
  const doneResizing = () => {
    const isLandscape = window.innerWidth > window.innerHeight;
    setTimeout(
      () => setIsLandscape(isLandscape),
      isLandscape ? 500 : 0
    )
  }

  useEffect(() => {
    setTimeout(
      () => setCanScroll(isLandscape),
      isLandscape ? 2500 : 0
    )
  }, [isLandscape]); 

  return (
    <Provider store={store}>
      <div className={isLandscape ? 'is-landscape' : ''} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Gallery canScroll={canScroll}/>
        <LightBox/>
        <Cover/>
      </div>
    </Provider>
  );
}

export default App;
