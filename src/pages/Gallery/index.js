import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import ScrollMagic from "scrollmagic";
import "../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

import Content from '@/components/Content'
import Sep from '@/components/Sep'
import InfoBox from '@/components/InfoBox'

import { 
  StyledContainer,
  Row,
  Column,
  RedLines,
  RedBorderImage,
} from './styles';

import bgFirstImage from '@/assets/images/bgFirst.png';
import bannerImage from '@/assets/images/banner.png';
import redLinesImage from '@/assets/images/redLines.png';

function Gallery() {

  // const screen = useSelector(state => state.screen);

  const controller = new ScrollMagic.Controller({ vertical: false,  });

  useEffect(() => {

    const parallaxElements = document.querySelectorAll(".parallaxElement");

    for (const element of parallaxElements) {
      // let offset = 0;
      // if($(this).css("--offset")!="undefined") myOffset = $(this).css("--offset");
      new ScrollMagic.Scene({
        triggerElement: element,
      //   offset: offset,												 
        triggerHook: 0.6,
        // duration: 2000, 
      //   offset: 450,
      })
      // .setPin(element)
      .setClassToggle(element, "animated")
      // .addIndicators({ }) 
      .addTo(controller);
    }

    new ScrollMagic.Scene({
      triggerElement: '#intro',
      offset: 100,												 
      triggerHook: 0,
    })
    .setClassToggle('#galleryContainer', "isOpened")
    .addIndicators({ }) 
    .addTo(controller);

  }, []); 

  const onWheel = (e) => {
    // e.preventDefault()
    const container = scrollRef.current;
    const containerScrollPosition = scrollRef.current.scrollLeft;

    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    });
  }

  const scrollRef = useRef();

  return (
    <div id="galleryContainer" ref={scrollRef} onWheel={onWheel} style={{ }}>
      <div id="scrollContent">

        <img id='bgFirst' src={bgFirstImage}/>
        {/* <img className='redLinesImage' src={redLinesImage}/> */}

        <div id="intro">
          <div id="banner">
            <img src={bannerImage}/>
          </div>
          {/* <InfoBox style={{ width: 400 }}>
            <p>
              展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展
            </p>
          </InfoBox> */}
        
        </div>
        
        <img className='featureImage' src='https://i.insider.com/5cb8b133b8342c1b45130629?width=700'/>
        
        <Content childrenStyle={{ bottom: 0 }}>
          <div style={{ height: window.innerHeight - 70 }}>
            <Sep/>
          </div>
        </Content>

        <Content style={{ position: 'relative' }}>
          <div className='row'>
            <div className='column' style={{ marginTop: 20 }}>
              <div className='title'>過去一年，你過得怎樣？</div>
              <div className='row'>
                <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
              </div>
            </div>
            <div className='videoContainer parallaxElement'>
              <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
            </div>
          </div>
          <div className='column'>
            <InfoBox style={{ alignSelf: 'flex-start' }} audio>
              <p>
                你好嗎？
                <br></br>
                先向大家作出一句親切慰問：「過去一年，你過得怎樣？」
              </p>
              <p>
                相片主題：
                <br></br>
                圍繞這年周遭生活人、事、物的照片（中性）
              </p>
              <p>
                DBS相位：
                <br></br>
                Klook 與 DBS 同事相討疫情對策
              </p>
            </InfoBox>
          </div>
        </Content>

        <img className='featureImage' src='https://i.insider.com/5cb8b133b8342c1b45130629?width=700'/>

        <Content>
          <div className='title'>
            不論工作、健康、社交、
            <br></br>
            旅遊、心情，無疑在這段時間，
            <br></br>
            大家也失去了不少東西。
          </div>
          <div className='row'>
            <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
            <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
          </div>
          <div className='row'>
            <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
            <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
            <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
            <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
          </div>
        </Content>

        <Content>
          <div className='videoContainer' style={{ marginLeft: 'auto' }}>
            <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
          </div>
          <InfoBox style={{ alignSelf: 'flex-start', paddingRight: 300 }}>
            <p>
              主題：
              <br></br>
              明白大家都有所失去
            </p>
            <p>
              相片主題：
              <br></br>
              在這年大家所遇到的困難及壞景況
            </p>
            <p>
              DBS相位：
              <br></br>
              採購部同事 Alison
              <br></br>
              忙於為同事搜購口罩
            </p>
          </InfoBox>
        </Content>

        <Content>
          <div className='row'>
            <div>
              <div className='largeVideoContainer' style={{ marginLeft: 100 }}>
                <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
              </div>
              <div className='title'>
                只要換個角度，
                <br></br>
                你或會發現原來你亦有「得」。
              </div>
            </div>
            <div style={{ marginLeft: 20 }}>
              <div className='row'>
                <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
              </div>
              <div className='row' style={{ marginTop: 20 }}>
                <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <div className="column">
                  <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                  <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                </div>
              </div>
            </div>
          </div>
        </Content>

        <Content style={{ height: '100%' }}>
          <div className='title' style={{ marginLeft: 80 }}>
            再行多一步，關懷身邊人
          </div>
        </Content>

        <img className='featureImage' src='https://i.insider.com/5cb8b133b8342c1b45130629?width=700'/>

        <img className='featureImage' src='https://i.insider.com/5cb8b133b8342c1b45130629?width=700'/>

     
      </div>
    </div>
  );
}

export default Gallery;

