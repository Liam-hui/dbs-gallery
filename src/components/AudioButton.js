import React, { useState, useEffect, useRef } from 'react';
import store from '@/store'

const AudioButton = (props) => {

  const { label, album, index } = props;

  const openLightBox = () => {
    if (album)
      store.dispatch({ 
        type: 'LIGHT_BOX_ON', 
        data: { 
          album: album,
          ... index && { index: index }
        } 
      });
  }

  return (
    <div className='audio-button-container parallax-element' onClick={openLightBox}>
      <div className='audio-button-label'>
        {album == 'sight' ?
          '盲蹤踪團隊口述影像'
        :
          label
        }
      </div>
      <img className='audio-button-icon' src={require('../assets/icons/icon-volume.svg').default}/>
    </div>
  )

}

export default AudioButton;
