import React, { useState, useEffect, useRef } from 'react';
import store from '@/store'

const Photo = (props) => {

  const { album, index, isHorizontal } = props;

  const openLightBox = () => {
    store.dispatch({ type: 'LIGHT_BOX_ON', data: { album: album, index: index } });
  }

  return (
    <img className={`photo parallax-element ${isHorizontal ? 'is-horizontal' : ''}`} src={require(`../assets/photos/${album}-${index}.jpg`).default} onClick={openLightBox}/>
  )

}

export default Photo;
