import React from 'react';

const LearnMore = () => {

  const scrollToTarget = () => {
    document.getElementById('content-dl').scrollIntoView();
  }

  return (
    <div className='learn-more' onClick={scrollToTarget}>
      learn more
    </div>
  )
}

export default function InfoBox(props) {

  const { children, style, learnMore } = props;

  return (
    <div 
      className='info-box parallax-element'
      style={{
        ...style,
        // '--offset': offset
      }}
    >
      {children}
      {learnMore &&
        <LearnMore/>
      }
    </div>
  );
}

