import React, { useState, useEffect } from 'react';
import store from '@/store'
import { useSelector } from 'react-redux'
import { useResizeDetector } from 'react-resize-detector'

export default function FeatureImage(props) {

  const { index, children } = props;

  const featureImagePosition = useSelector(state => state.featureImagePosition);

  const [position, setPosition] = useState(0);
  const [width, setWidth] = useState(0);

  const onResize = () => {
    const isOpened = document.getElementById('gallery-container').classList.contains('scroll-content');
    if (!isOpened) {
      if (index == 1) {
        store.dispatch({ type: 'SET_FEATURE_IMAGE_POSITION', payload: ref.current.offsetLeft })
      }
      else {
        setPosition(ref.current.offsetLeft);
        setWidth(ref.current.offsetWidth);
      }
    }
  }

  const { ref } = useResizeDetector({ onResize });

  return (
    <div
      div 
      className='feature-image-wrapper lines-source' 
      id={`feature-image-${index}`}
      ref={ref}
      style={{
        transform: `translateX(-${position - featureImagePosition - (index - 1)  * width}px)`
      }}
    >
      <div>
        <img src={require(`../assets/photos/feature_photo_${index}.png`).default}/>
        {children}
      </div>
    </div>
  );
}

