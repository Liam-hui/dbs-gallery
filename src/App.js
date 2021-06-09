import React, { useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Cover from '@/pages/Cover';
import Gallery from '@/pages/Gallery';
import LightBox from '@/pages/LightBox';

import '@/styles/styles.css';

function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const isLoadedRef = useRef(isLoaded);
  const [isLandscape, setIsLandscape] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    Promise.all(
      Array.from(document.images).filter(img => !img.complete)
        .map(img => new Promise (
          resolve => { 
            img.onload = img.onerror = resolve; 
          }
        ))
      ).then(() => {
        // console.log('images finished loading');
        setIsLoaded(true);
        isLoadedRef.current = true;
      }
    );
    setTimeout(
      () => {
        setIsLoaded(true);
        isLoadedRef.current = true;
      }
      ,8000
    )
  }, []); 

  const setBgHeight = () => {
    document.getElementById('bg-start').style.height = window.innerHeight + 'px';
  }

  useEffect(() => {
    if (isLoaded) {
      setBgHeight();
      setTimeout(
        () => setIsLandscape(window.innerWidth > window.innerHeight)
      ,500)
    }
  }, [isLoaded]); 

  //execute when resizing finish
  let resizeLoop;
  const doneResizing = () => {
    if (isLoadedRef.current)
      setIsLandscape(window.innerWidth > window.innerHeight);
  }
  window.addEventListener("resize", () => {
    setBgHeight();
    clearTimeout(resizeLoop);
    resizeLoop = setTimeout(doneResizing, 200);
    // setIsLandscape(window.innerWidth > window.innerHeight);
  });

  useEffect(() => {
    setTimeout(
      () => setCanScroll(isLandscape),
      isLandscape ? 800 : 0
    )
  }, [isLandscape]); 

  return (
    <Provider store={store}>
      <div className={isLandscape ? 'is-landscape' : ''} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Gallery isLandscape={isLandscape} canScroll={canScroll}/>
        <LightBox/>
        <Cover isLoaded={isLoaded}/>
      </div>
    </Provider>
  );
}

export default App;
