import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Cover from '@/pages/Cover';
import Gallery from '@/pages/Gallery';

import '@/styles/styles.css';

function App() {

  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    setTimeout(
      () => setIsLandscape(screen.width > screen.height)
    , 500)
  }, []); 

  //execute when resizing finish
  let resizeLoop;
  window.addEventListener("resize", () => {
    clearTimeout(resizeLoop);
    resizeLoop = setTimeout(doneResizing, 500);
  });
  function doneResizing() {
    setIsLandscape(screen.width > screen.height)
  }

  return (
    <Provider store={store}>
      <div className={isLandscape ? 'isLandscape' : ''} style={{ width: '100%', height: '100%' }}>
        <Gallery/>
        <Cover/>
      </div>
    </Provider>
  );
}

export default App;
