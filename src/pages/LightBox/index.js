import React, { useState, useEffect, useCallback } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { MdClose } from "react-icons/md";

import AudioPlayer from '@/components/AudioPlayer'

export default function LightBox(props) {

  const { children, style, audio, learnMore, parallax, offset } = props;

  return (
    <div className={`light-box`}>
      <div className='light-box-background'/>
      <div className='light-box-inner'>
        <FeatureStory/>
      </div>
      <div className='light-box-close-button'>
        <MdClose/>
      </div>
    </div>
  );
}

const FeatureStory = () => {

  const [imageHeight, setImageHeight] = useState(0)
  const onResize = useCallback((e) => {
    setImageHeight(ref.current.offsetHeight)
  }, []);
  const { ref } = useResizeDetector({ onResize });

  return (
    <div className="feature-story">
      <div className='title'>
        一起放慢，讓心思跟著棱鏡
        <br/>
        折射出來的光線走。
      </div>
      <div className="row" ref={ref}>
        <img className="feature-story-image" style={{ height: imageHeight }} src={require('../../assets/photos/photo1.00.png').default}/> 
        <div className="feature-story-content">
          <p>
            <h1>
              盲蹤踪攝影師 Cathy
              <br/>
              鏡頭下的薛凱琪
            </h1>
            <br/>
            Cathy：「透過額外加在鏡頭前的棱鏡，
            能夠同時間，映照出 Fiona 很多面向。
            正如我們日常生活，從不同角度切入，
            自會看出不一樣的事物。」
          </p>
          <AudioPlayer/>
        </div>
      </div>
    </div>
  )

}

