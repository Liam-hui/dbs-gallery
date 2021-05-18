import React from 'react';
import { useSelector } from "react-redux";

import { StyledContainer } from './styles';

const Audio = () => {
  return (
    <div className='audio'>
      <div className='audioLabel'>聲音導航</div>
      <div className='audioIcon'/>
    </div>
  )
}

export default function InfoBox(props) {

  const { children, style, audio } = props;

  const screen = useSelector(state => state.screen);

  return (
    <div className='blurBox' style={style}>
      {children}
      {audio &&
        <Audio/>
      }
    </div>
  );
}
