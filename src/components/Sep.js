import React from 'react';

const Sep = (props) => {

  const { isAutoHeight, isNotParallax, white } = props;

  return (
    <div className={`sep-wrapper ${!isNotParallax ? 'parallax-element' : ''} ${white ? 'white' : ''}`}>
      <div className='sep' style={ !isAutoHeight ? { height: window.innerHeight * 0.92 } : {}}>
        <div className="sep-circle">
          <div/>
          <div/>
        </div>
      </div>
    </div>
  )
}

export default Sep;