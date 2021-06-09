import React, { useState, useEffect, useCallback, useRef } from 'react';
import store from '@/store'
import { useSelector } from 'react-redux'
import { useResizeDetector } from 'react-resize-detector';
import { MdClose } from "react-icons/md";

import { photosData } from "@/data";
import AudioPlayer from '@/components/AudioPlayer'

export default function LightBox() {

  const { isOn, data } = useSelector(state => state.lightBox);

  const [isVisible, setIsVisible] = useState(null);

  useEffect(() => {
    if (isOn) {
      document.querySelectorAll("video").forEach((video) => {
        video.pause();
      });
      setTimeout(
        () => setIsVisible(isOn),
        100
      )
    }
  }, [isOn]); 

  useEffect(() => {
    if (isVisible == false)
      setTimeout(
        () => store.dispatch({ type: 'LIGHT_BOX_OFF' }),
        500
      )
  }, [isVisible]); 

  const closeLightBox = () => {
    setIsVisible(false)
  }

  if (isOn) return (
    <div className={`light-box ${isVisible ? 'is-visible' : ''}`}>
      <div className='light-box-background'/>
      <div className='light-box-inner'>
        <Story data={data}/>
      </div>
      <div className='light-box-close-button' onClick={closeLightBox}>
        <MdClose/>
      </div>
    </div>
  );

  else return null;
}

const Story = ({ data }) => {
  
  const { album } = data;
  const [index, setIndex] = useState(data.index?? 1) 

  const [imageHeight, setImageHeight] = useState(0)
  const hasSetRef = useRef(false);
  const onResize = useCallback((e) => {
    if(hasSetRef.current == false) {
      hasSetRef.current = true;
      setImageHeight(ref.current.offsetHeight)
    }
  }, []);
  const { ref } = useResizeDetector({ onResize });

  const photoData = photosData[album]['photos'][index];

  const goToNext = (value) => {
    setIndex(index + value)
  }

  return (
    <div className={`story ${album == 'sight' ? 'full' : ''}`}>
      {album == 'sight' && 
        <div className='title'>
          {photoData?.title?? ''}
        </div>
      } 
      <div className="row" ref={ref}>
        {
          <img 
            className='story-image'
            style={{ height: imageHeight }} 
            src={require(`../assets/photos/${album}-${index}.jpg`).default}
          /> 
        }
        <div className="story-content">
          <p>
            <h1>
              {album == 'sight' ?
                photoData?.heading?? ''
              :
                `Photo Stories by ${photosData[album].label}`
              }
            </h1>
            <br/>
            {photoData?.paragraph?? ''}
          </p>
          <AudioPlayer audio={require(`../assets/audios/${album}-${index}.mp3`).default}/>
          <div className='label'>
            {album == 'sight' ?
              '盲蹤踪團隊口述影像'
            :
              `${photosData[album].label} 聲音導航`
            }
          </div>
          {album == 'sight' ?
            <img className='sight-logo' src={require(`../assets/images/sight-logo.png`).default}/>
          :
            <img className='audio-icon' src={require('../assets/icons/icon-volume.png').default}/>
          }
        </div>
      </div>
      
        {index > 1 &&
          <img className='arrow-icon arrow-icon-left' src={require('../assets/icons/icon-arrow.png').default} onClick={() => goToNext(-1)}/>
        }
        {Object.keys(photosData[album].photos).length > index &&
          <img className='arrow-icon arrow-icon-right' src={require('../assets/icons/icon-arrow.png').default} onClick={() => goToNext(1)}/>
        }

    </div>
  )

}

