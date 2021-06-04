import React from 'react';

const Audio = () => {
  return (
    <div className='audio'>
      <div className='audio-label'>聲音導航</div>
      <div className='audio-icon'/>
    </div>
  )
}

const LearnMore = () => {
  return (
    <div className='learn-more'>
      learn more
    </div>
  )
}

export default function InfoBox(props) {

  const { children, style, audio, learnMore, parallax, offset } = props;

  return (
    <div 
      className={`info-box${parallax ? ' parallax-element' : ''}`} 
      style={{
        ...style,
        '--offset': offset
      }}
    >
      {children}
      {learnMore &&
        <LearnMore/>
      }
      {/* {audio &&
        <Audio/>
      } */}
    </div>
  );
}

