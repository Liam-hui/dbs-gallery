import React from 'react';

const Audio = () => {
  return (
    <div className='audio'>
      <div className='audioLabel'>聲音導航</div>
      <div className='audioIcon'/>
    </div>
  )
}

const LearnMore = () => {
  return (
    <div className='learnMore'>
      learn more
    </div>
  )
}

export default function InfoBox(props) {

  const { children, style, audio, learnMore, parallax, offset } = props;

  return (
    <div className={`infoBox${parallax ? ' parallaxElement' : ''}`} style={style} data-offset={offset}>
      {children}
      {learnMore &&
        <LearnMore/>
      }
      {audio &&
        <Audio/>
      }
    </div>
  );
}

