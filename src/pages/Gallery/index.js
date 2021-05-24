import React, { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import ScrollMagic from "scrollmagic";
import "../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

import LinesCanvas from '@/pages/LinesCanvas';
import Content from '@/components/Content'
import Sep from '@/components/Sep'
import InfoBox from '@/components/InfoBox'

import featureImage1 from '@/assets/images/feature_image_1.png';
import featureImage2 from '@/assets/images/feature_image_2.png';
import featureImage3 from '@/assets/images/feature_image_3.png';
import featureImage4 from '@/assets/images/feature_image_4.png';

import bgFirstImage from '@/assets/images/bgFirst.png';
import bannerImage from '@/assets/images/banner.png';
import mailIconImage from '@/assets/icons/icon-mail.png';
import appBgImage from '@/assets/images/app_bg.png';
import mountainBgImage from '@/assets/images/mountain_bg.png';
import dbsLogoImage from '@/assets/images/dbs_logo.png';
import warnerLogoImage from '@/assets/images/warner_logo.png';
import mokoLogoImage from '@/assets/images/moko_logo.png';

function Gallery({ canScroll }) {

  const controller = new ScrollMagic.Controller({ vertical: false });

  useEffect(() => {

    // parallax scrolling
    const parallaxElements = document.querySelectorAll(".parallaxElement");
    for (const element of parallaxElements) {
      const offset = getComputedStyle(element).getPropertyValue('--offset');
      new ScrollMagic.Scene({
        triggerElement: element,
        offset: offset != '' ? offset : 0,												 
        triggerHook: 0.65,
      })
      .setClassToggle(element, "animated")
      // .addIndicators({ }) 
      .addTo(controller);
    }

    // trigger gallery open content
    new ScrollMagic.Scene({
      triggerElement: '#intro',
      offset: 50,												 
      triggerHook: 0,
    })
    .setClassToggle('#galleryContainer', "isOpened")
    // .addIndicators({ }) 
    .addTo(controller);

    // show lines
    const linesSources = document.querySelectorAll(".linesSource");
    for (const element of linesSources) {
      new ScrollMagic.Scene({
        triggerElement: element,											 
        triggerHook: 0.2,
      })
      .on("enter", function (e) {
        showLines(element);
      })
      .on("leave", function (e) {
        hideLines(element);
      })
      .addIndicators({ }) 
      .addTo(controller);
    }
      

  }, []); 


  const showLines = (element) => {
    const lines = element.querySelectorAll(`.line`);
    for (const line of lines) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = element.querySelector("img")

      const x = line.dataset.x;
      const y = line.dataset.y;
      const height = line.dataset.height;

      canvas.width = 1;
      canvas.height = image.naturalHeight * height;

      const isWide = image.naturalHeight / image.naturalWidth < image.offsetHeight / image.offsetWidth;
      const imageAdjustedHeight = isWide ? image.naturalHeight : image.naturalWidth * image.offsetHeight/image.offsetWidth;
      const imageAdjustedWidth = isWide ? image.naturalHeight * image.offsetWidth/image.offsetHeight : image.naturalWidth;

      ctx.drawImage(
        image, // source
        (image.naturalWidth - imageAdjustedWidth) * 0.5 + imageAdjustedWidth * x,  // source_start_x
        (image.naturalHeight - imageAdjustedHeight) * 0.5 + imageAdjustedHeight * y, // source_start_y
        1, // source_width
        imageAdjustedHeight * height, // source_height
        0, // canvas_start_x
        0, // canvas_start_y
        1, // draw_width
        image.offsetHeight * height // draw_height
      );

      line.style.left = x * 100 + '%';
      line.style.top =  y * 100 + '%';
      line.style.height = image.offsetHeight * height + 'px';
      line.style.background = "url(" + canvas.toDataURL() + ")";
      line.classList.add("isDrawn");
    }
  }

  const hideLines = (element) => {
    const lines = element.querySelectorAll(`.line`);
    for (const line of lines) {
      line.classList.remove("isDrawn");
    }
  }

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
    <div id="galleryContainer" 
      ref={scrollRef} 
      onWheel={!isMobile && canScroll ? onWheel : null}
      style={{ overflowX: canScroll ? 'scroll' : 'hidden' }}
    >
      <div id="scrollContent">

        <div id='bgFirst'>
          <img src={bgFirstImage}/>
        </div>

        <div id="intro">
          <div id="banner">
            <img src={bannerImage}/>
          </div>
          <InfoBox>
            <p>
              展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展覽由來介紹展
            </p>
          </InfoBox>
        </div>
        
        <div className='featureImage linesSource' id="featureImage0">
          <img src={featureImage1}/>
          <div className="line" data-x="0.5" data-y="0.5" data-height="0.15"/>
          <div className="line" data-x="0.7" data-y="0.2" data-height="0.1"/>
        </div>
        
        <Content index={0}>
          <div style={{ height: window.innerHeight - 70, marginTop: 'auto'}}>
            <Sep/>
          </div>
          <div>
            <div className='row'>
              <div className='column'>
                <div className='title parallaxElement'>過去一年，你過得怎樣？</div>
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
              <InfoBox style={{ alignSelf: 'flex-start' }} audio learnMore parallax offset={300}>
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
                  <img className='parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                  <br></br>
                  Klook 與 DBS 同事相討疫情對策
                </p>
              </InfoBox>
            </div>
          </div>
        </Content>

        <div className='featureImage linesSource' id="featureImage1">
          <img src={featureImage2}/>
          <div className="line" data-x="0.5" data-y="0.5" data-height="0.15"/>
          <div className="line" data-x="0.7" data-y="0.2" data-height="0.1"/>
        </div>

        <Content index={1}>
          <div>
            <div className='title parallaxElement'>
              不論工作、健康、社交、
              <br></br>
              旅遊、心情，無疑在這段時間，
              <br></br>
              大家也失去了不少東西。
            </div>
            <div className='row'>
              <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
              <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
              <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
            </div>
            <div className='row'>
              <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
              <img className='redBorderImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div className='videoContainer parallaxElement'>
              <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
            </div>
            <InfoBox parallax>
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
                <img className='parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <br></br>
                採購部同事 Alison
                <br></br>
                忙於為同事搜購口罩
              </p>
            </InfoBox>
          </div>
        </Content>

        <Content index={2}>
          <div>
            <div className='videoContainer largeVideo parallaxElement' style={{ marginLeft: 100 }}>
              <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
            </div>
            <div className='title parallaxElement'>
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
          <div className='parallaxElement' style={{ height: window.innerHeight - 70, marginLeft: 10, marginTop: 'auto'}}>
            <Sep/>
          </div>
        </Content>

        <div className='featureImage' id="featureImage2">
          <img src={featureImage3}/>
        </div>

        <Content index={3}>
          <div className='title parallaxElement'>
            再行多一步，關懷身邊人
          </div>
          <div className='row contentThree'>
            <div className='column'>
              <img className='squareImage parallaxElement' style={{ alignSelf: 'flex-end' }} src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
              <div className='videoContainer parallaxElement' style={{ marginLeft: 'auto' }}>
                <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
              </div>
              <div className='row verticalMargin' style={{ flex: 1, justifyContent: 'space-between' }}>
                <img className='redBorderImage parallaxElement' style={{ margin: 0 }} src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <img className='redBorderImage parallaxElement' style={{ margin: 0 }} src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
              </div>
            </div>
            <div className='horizontalMargin'>
              <InfoBox audio learnMore parallax offset={300}>
                <p>
                  發現自己生活上的微小美好事物後，
                  <br></br>
                  看看身邊，一年來，蹤難行，
                  <br></br>
                  你、我都能走到這裡
                </p>
                <p>
                  相片主題：與親戚、朋友、
                  <br></br>
                  同事開心生活照（正面）
                </p>
                <p>
                  <img className='parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                  <br></br>
                  DBS Frontline 同事相片
                </p>
              </InfoBox>
              {/* <div className='row verticalMargin'>
                <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
              </div> */}
            </div>
          </div>
        </Content>

        <div className='featureImage' id="featureImage3">
          <img src={featureImage4}/>
        </div>

        <Content index={4}>
          <div className='parallaxElement' style={{ height: window.innerHeight - 70, marginTop: 'auto'}}>
            <Sep/>
          </div>
          <div>
            <div className='row'>
              <div className='column'>
                <div className='title parallaxElement'>
                  在失去之中，
                  <br></br>
                  用心發現，也必有所得
                </div>
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
            <div className='row'>
              <InfoBox style={{ alignSelf: 'flex-start' }} audio learnMore parallax offset={300}>
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
                  <img className='parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                  <br></br>
                  Klook 與 DBS 同事相討疫情對策
                </p>
              </InfoBox>
              <div className="horizontalMargin">
                <div className='row verticalMargin'>
                  <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                  <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                </div>
                <div className='row verticalMargin'>
                  <img className='squareImage parallaxElement' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>
                  {/* <img className='squareImage parallaxElement' style={{ margin: 0 }} src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/> */}
                </div>
              </div>
            </div>
          </div>
        </Content>

        <Content index={5}>
          <div>
            <div className='row verticalMargin heading parallaxElement'>
              <img src={dbsLogoImage}/>
              與你同行
            </div>
            <div className='videoContainer largeVideo parallaxElement'>
              <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
            </div>
          </div>
          <div className='title parallaxElement' style={{ '--offset': -700 }}>
            聯手，讓心思放大，
            <br></br>
            剎那，展出大意義。
          </div>
          <InfoBox audio parallax offset={300}>
            <p>
              別停下，繼續前行，
              <br></br>
              每天都是「開引號」，
              <br></br>
              每步，都是一個新開端，
              <br></br>
              每剎那，都有其意義。
            </p>
          </InfoBox>
        </Content>

        <Content index={6} style={{ paddingTop: 0 }}>
          <div id='contactUs'>
            <div className='heading parallaxElement'>
              如欲有意購買明信片，
              <br></br>
              請即聯絡
              <img src={mailIconImage}></img>
            </div>
          </div>
          <div className="appInfo">
            <img src={appBgImage}/>
            <div class="flexFill parallaxElement">
              <div className='org'>
                主辦及策展
                <div id="dbsLogo" class="logo"/>
              </div>
            </div>
            <div class="flexFill parallaxElement" style={{ justifyContent: 'flex-start' }}>
              <div>
                <a href="https://www.facebook.com/DL.theVOC/" target="_blank">
                  <div className='row'>
                    <div id="facebookIcon" class="icon"/>
                    facebook.com/DL.theVOC
                  </div>
                </a>
                <a href="https://www.instagram.com/dl.thevoc/" target="_blank">
                  <div className='row'>
                    <div id="instagramIcon" class="icon"/>
                    instagram.com/dl.thevoc/
                  </div>
                </a>
              </div>
              <p style={{ marginTop: 'auto' }}>
                立即下載
              </p>
              <div className='row'>
                <a href="" target="_blank">
                  <div id="downloadIos" class="downloadButton"/>
                </a>
                <a href="" target="_blank">
                  <div id="downloadAndroid" class="downloadButton"/>
                </a>
              </div>
            </div>
          </div>
          <div className="mountain">
            <img src={mountainBgImage}/>
            <div class="flexFill parallaxElement">
              <div className='org'>
                協辦
                <div id="dbsLogo" class="logo"/>
              </div>
            </div>
          </div>
        </Content>

        <Content index={7} style={{ paddingTop: 0 }}>
          <div className='orgWrapper'>
            <div className='org parallaxElement'>
              呈獻
              <div id="dbsLogo" class="logo"/>
            </div>
            <div className='org parallaxElement'>
              特別鳴謝
              <div id="warnerLogo" class="logo"/>
            </div>
            <div className='org parallaxElement'>
              場地贊助
              <div id="mokoLogo" class="logo"/>
            </div>
            <div className='org parallaxElement'>
              受惠機構
              <div id="hkgdaLogo" class="logo"/>
            </div>
          </div>
        </Content>

      </div>
    </div>
  );
}

const getPosition = (el) => {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

export default Gallery;
