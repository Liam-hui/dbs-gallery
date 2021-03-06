import React from 'react';

import Sep from '@/components/Sep'

const Cover = ({ isLoaded }) => {

  return (
    <div id="cover">
      {isLoaded ? 
        <div id='rotate'>
          <img src={require('../assets/icons/icon-rotate.png').default}/>
            請解除「直向鎖定」
            <br/>
            並橫置以開啟旅程
        </div> 
      :
        <div className='loading-wrapper'>
          <div className="loading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      }
      <div>
        生活是一個開引號
        <div style={{ position: 'absolute', height: 'calc(50% + 30px)', marginLeft: -30, bottom: 0 }}>
          <Sep isAutoHeight isNotParallax/>
        </div>
      </div>
    </div>
  );
}

export default Cover;

