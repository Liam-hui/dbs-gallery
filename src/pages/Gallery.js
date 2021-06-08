import React, { useState, useEffect, useRef } from 'react';
import store from '@/store';
import { isMobile } from 'react-device-detect';
import ScrollMagic from "scrollmagic";
import { useResizeDetector } from 'react-resize-detector'
// import "../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

import ArtistPhoto from '@/components/ArtistPhoto'
import Photo from '@/components/Photo'
import Sep from '@/components/Sep'
import InfoBox from '@/components/InfoBox'
import AudioButton from '@/components/AudioButton'

import { FiMail } from "react-icons/fi";

function Gallery({ canScroll }) {

  const controller = new ScrollMagic.Controller({ vertical: false });
  // const [scrollPosition, setScrollPosition] = useState({});

  useEffect(() => {

    // video add listener 
    document.querySelectorAll("video").forEach((el) => {
      el.onplay = function(e){
        document.querySelectorAll("video").forEach((el1) => {
            if(el === el1)
                el1.play();
            else
                el1.pause();
        });
      }
    });

    // parallax scrolling
    const parallaxElements = document.querySelectorAll(".parallax-element");
    for (const element of parallaxElements) {
      let offset = getComputedStyle(element).getPropertyValue('--offset');
      if (offset == '')
        offset = (Math.random() * 2 - 1) * ( isMobile ? 20 : 50 );
      new ScrollMagic.Scene({
        triggerElement: element,
        offset: offset,										 
        triggerHook: 0.8,
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
    .setClassToggle('#gallery-container', "is-opened")
    // .addIndicators({ }) 
    .addTo(controller);

    // show lines
    const linesSources = document.querySelectorAll(".lines-source");
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
      // .addIndicators({ }) 
      .addTo(controller);
    }
      
  }, []); 


  let resizeLoopRef = useRef(null);
  const doneResizing = () => {
    let position;
    const width = document.getElementsByClassName('artist-photo')[0].offsetWidth;
    const isOpened = document.getElementById('gallery-container').classList.contains('is-opened');
    if (!isOpened) {
      const artistPhotos = document.querySelectorAll(".artist-photo-wrapper");
      for (const artistPhoto of artistPhotos) {
        const index = artistPhoto.getAttribute("data-index");
        if (index == 1) {
          position = artistPhoto.offsetLeft;
        }
        else
          artistPhoto.getElementsByClassName('artist-photo')[0].style.transform = `translateX(-${artistPhoto.offsetLeft - position - (index - 1)  * width}px)`;
      }
    }
  }

  const onResize = () => {
    clearTimeout(resizeLoopRef.current);
    resizeLoopRef.current = setTimeout(doneResizing, 1000);
  }
  const { ref } = useResizeDetector({ onResize });


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
      line.classList.add("is-drawn");
    }
  }

  const hideLines = (element) => {
    const lines = element.querySelectorAll(`.line`);
    for (const line of lines) {
      line.classList.remove("is-drawn");
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

  const openLightBox = (album, index) => {
    store.dispatch({ 
      type: 'LIGHT_BOX_ON', 
      data: { 
        album: album,
        ... index && { index: index }
      } 
    });
  }

  return (
    <div 
      id="gallery-container" 
      ref={scrollRef} 
      onWheel={!isMobile && canScroll ? onWheel : null}
      style={{ overflowX: canScroll ? 'scroll' : 'hidden' }}
    >
      <div 
        id="scroll-content" 
        ref={ref}
      >

        <div id='bg-start'>
          <img src={require('../assets/images/bg-start.png').default}/>
        </div>

        <div id="intro">
          <div id="banner">
            <img src={require('../assets/images/banner.png').default}/>
          </div>
          <p style={{ textAlign: 'end' }}>
            一眾視障攝影師&nbsp;&nbsp;✕&nbsp;&nbsp;Fiona 薛凱琪&nbsp;&nbsp;&nbsp;&nbsp;Janice 衛蘭&nbsp;&nbsp;&nbsp;&nbsp;JUDE 曾若華&nbsp;&nbsp;&nbsp;&nbsp;Jill 衛詩
            <h1>疫情下，用鏡頭看世界</h1>
            6月15日-7月5日
            <br/>
            MOKO 旺角新世紀廣場L1樓層
            <img className="rays" src={require('../assets/images/rays.png').default}/>
          </p>
          <img className="human" src={require('../assets/images/human-1.svg').default}/>
        </div>
        
        <ArtistPhoto index={1}>
          <div className="line" data-x="0.99" data-y="0.3" data-height="0.25"/>
          <div className="photo-credit-text">攝影：盲蹤踪攝影師 Cathy</div>
          <div className="artist-name">Fiona 薛凱琪</div>
        </ArtistPhoto>

        <div id='content-1' className='content-container'>
          <Sep/>
          <div>
            <div className='column'>
              <div className='title parallax-element'>
                <img src={require('../assets/images/title-1.svg').default}/>
              </div>
              <div className="story-credit-text parallax-element">Photo Stories by Fiona</div>
              <div className='row' style={{ zIndex: 10 }}>
                <Photo album="fiona" index={1}/>
                <Photo album="fiona" index={2}/>
                <Photo album="fiona" index={3}/>
                <Photo album="fiona" index={4}/>
                <Photo album="fiona" index={5} isHorizontal/>
                <AudioButton label="Fiona 聲音導航" album="fiona"/>
              </div>
            </div>
            <div className="row" style={{ alignItems: 'flex-end' }}>
              <InfoBox learnMore style={{ alignSelf: 'flex-start' }}>
                <div className="row">
                  <p className="parallax-element">
                    <br/>
                    面對世界環境急劇變化，
                    <br/>
                    除了疫情，Fiona 還要面對，突如其來聽覺失聰等問題，
                    <br/>
                    令其歌唱事業起了障礙。但這並沒有迫使她停下腳步，
                    <br/>
                    而且還發掘出，更多可能性，不論是成為 MV 導演，
                    <br/>
                    抑或大力發展個人時裝品牌，
                    <br/>
                    她均逐步繼續堅持，逐一初嘗實踐。
                    <br/>
                    <br/>
                    <b>
                      如她常旁身邊的座右銘：
                      <br/>
                      Never say never, anything is possible.
                      <br/>
                      <br/>
                      保持內心靈魂堅定，才是最重要的事情。
                      <br/>
                    </b>
                  </p>
                  <div className="parallax-element">
                    <p><b>
                      盲蹤踪攝影師 Cathy
                      <br/>
                      鏡頭下的薛凱琪
                    </b></p>
                    <img className='isClick' onClick={() => openLightBox('sight', 1)} src={require('../assets/photos/sight-1.jpg').default}/>
                  </div>
                </div>
              </InfoBox>
              <AudioButton album="sight" index={1}/>
            </div>
          </div>
          <div className='video-wrapper parallax-element'>
            <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
          </div>
        </div>

        <ArtistPhoto index={2}>
          <div className="line" data-x="0.785" data-y="0.66" data-height="0.25"/>
          <div className="photo-credit-text">攝影：盲蹤踪攝影師 郭健</div>
          <div className="artist-name">Janice 衛蘭</div>
        </ArtistPhoto>

        <div id='content-2' className='content-container'>
          <Sep/>
          <div>
            <div className='column'>
              <div className='title parallax-element'>
                <img src={require('../assets/images/title-2.svg').default}/>
              </div>
              <div>
                <div className="story-credit-text parallax-element">Photo Stories by Janice</div>
                <div className='row' style={{ zIndex: 10 }}>
                  <Photo album="janice" index={1}/>
                  <Photo album="janice" index={2}/>
                  <Photo album="janice" index={3} isHorizontal/>
                  <Photo album="janice" index={4} isHorizontal/>
                  <Photo album="janice" index={5} isHorizontal/>
                  <AudioButton label="Janice 聲音導航" album="janice"/>
                </div>
                <div className="row" style={{ alignItems: 'flex-end' }}>
                  <InfoBox style={{ alignSelf: 'flex-start', display: 'inline-block' }} learnMore>
                    <div className="row">
                      <p className="parallax-element">
                        每一次看見鷹在天上飛翔的時候，
                        <br/>
                        Janice 也感到非常自由。
                        <br/>
                        每當早上太陽出來的時候，內心更充滿希望。
                        <br/>
                        散落滿地的花朵，看似沒有用途的小東西，
                        <br/>
                        只要保持細心和專注，
                        <br/>
                        也可發現它之美。
                        <br/>
                        <br/>
                        然而 Janice 最喜歡小朋友玩樂時
                        <br/>
                        的表情天真爛漫，這亦令她在疫情下心情稍頓，
                        <br/>
                        <b>
                          回歸樸素之心，就算以素臉示人，
                          <br/>
                          亦能向大家表現最自信及真實一面。
                        </b>
                      </p>
                      <div className="feature parallax-element">
                        <p><b>
                          盲蹤踪攝影師 郭健
                          <br/>
                          鏡頭下的衛蘭
                        </b></p>
                        <img className='isClick' onClick={() => openLightBox('sight', 2)} src={require('../assets/photos/sight-2.jpg').default}/>
                      </div>
                    </div>
                  </InfoBox>
                  <AudioButton album="sight" index={2}/>
                </div>
              </div>
            </div>
          </div>
          <div className='video-wrapper parallax-element'>
            <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
          </div>
        </div>

        <ArtistPhoto index={3}>
          <div className="line" data-x="0.88" data-y="0.6" data-height="0.35"/>
          <div className="artist-name">JUDE 曾若華</div>
        </ArtistPhoto>

        <div id='content-3' className='content-container'>
          <Sep/>
          <div>
            <div className='title parallax-element'>
              <img src={require('../assets/images/title-3.svg').default}/>
            </div>
            <div className='row'>
              <div className='video-wrapper parallax-element'>
                <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
              </div>
              <InfoBox style={{ alignSelf: 'flex-start' }} learnMore>
                <div className="row">
                  <p className='parallax-element'>
                    躺身於大海中央、
                    <br/>
                    土耳其山谷迷途經歷、
                    <br/>
                    荒廢遊樂場摩天輪、
                    <br/>
                    在拉斯維加斯公路上打起鼓來。
                    <br/>
                    <br/>
                    在疫情全球封關的時刻，
                    <br/>
                    看著從前 backpacker 背包旅行的相片，
                    <br/>
                    直令 JUDE 回想起初出道時的初心
                    <br/>
                    <br/>
                    <b>
                      如果現在未能起行，不打緊。
                      <br/>
                      我們可籍此做足準備，
                      <br/>
                      當時機來臨，自能再次起航，
                      <br/>
                      邁向世界。
                    </b>
                  </p>
                  <div className="row photo-container">
                    <div className="photo-container-1">
                      <div className="story-credit-text parallax-element">Photo Stories by JUDE</div>
                      <Photo album="jude" index={1} isHorizontal/>
                      <Photo album="jude" index={2} isHorizontal/>
                      <Photo album="jude" index={3} isHorizontal/>
                    </div>
                    <div className="photo-container-2">
                      <Photo album="jude" index={4} isHorizontal/>
                      <Photo album="jude" index={5} isHorizontal/>
                      <Photo album="jude" index={6}/>
                    </div>
                    <AudioButton label="JUDE 聲音導航" album='jude'/>
                  </div>
                </div>
                <div className="feature">
                  <div className="row">
                    <div className="parallax-element">
                      <img className='isClick feature-photo' onClick={() => openLightBox('sight', 3)} src={require('../assets/photos/sight-3.jpg').default}/>
                      <p><b>
                        盲蹤踪攝影師 郭健
                        <br/>
                        鏡頭下的曾若華
                      </b></p>
                    </div>
                    <AudioButton album="sight" index={3}/>
                  </div>
                </div>
              </InfoBox>
            </div>
            <img className="human" src={require('../assets/images/human-2.svg').default}/>
          </div>
        </div>

        <ArtistPhoto index={4}>
          <div className="line" data-x="0.73" data-y="0.4" data-height="0.6"/>
          <div className="artist-name">Jill 衛詩</div>
        </ArtistPhoto>

        <div id='content-4' className='content-container'>
          <Sep/>
          <div>
            <div className="column" style={{ alignItems: 'flex-end', display: 'inline-flex' }}>
              <div className="row" style={{ alignItems: 'flex-end' }}>
                <div className='title parallax-element'>
                  <img src={require('../assets/images/title-4.svg').default}/>
                </div>
                <AudioButton label="JUDE 聲音導航"/>
                <Photo album="jill" index={1} isHorizontal/>
              </div>
              <div className="row row-2">
                <div>
                  <Photo album="jill" index={2} isHorizontal/>
                  <div className="story-credit-text parallax-element">Photo Stories by Jill</div>
                </div>
                <Photo album="jill" index={3} isHorizontal/>
                <Photo album="jill" index={4} isHorizontal/>
                <Photo album="jill" index={5} isHorizontal/>
              </div>
            </div>
            <InfoBox style={{ alignSelf: 'flex-start' }} learnMore>
              <div className="row">
                <p className='parallax-element'>
                  一個擁抱，
                  <br/>
                  一聲問候，
                  <br/>
                  一下牽手。
                  <br/>
                  不要覺得，
                  <br/>
                  剎那瞬間即逝微不足道，
                  <br/>
                  <br/>
                  疫情下，緊隨信仰帶領，
                  <br/>
                  Jill 從表演舞台，走到日常社區，
                  <br/>
                  明白到不論是明星歌手，又或任何身分，
                  <br/>
                  <b>
                    一小個動作，也可以對身邊人，
                    <br/>
                    起著莫大影響
                  </b>
                </p>
                <div className="feature parallax-element">
                  <p><b>
                    盲蹤踪攝影師 郭健
                    <br/>
                    鏡頭下的衛詩
                  </b></p>
                  <img className='isClick' onClick={() => openLightBox('sight', 4)} src={require('../assets/photos/sight-4.jpg').default}/>
                </div>
                <AudioButton album="sight" index={4}/>
              </div>
            </InfoBox>
          </div>
          <div className='video-wrapper parallax-element'>
            <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
          </div>
        </div>

        <div id='content-dl' className='content-container parallax-element'>
          <div className="sep-outer">
            <Sep isAutoHeight white/>
          </div>
          <div className="column">
            <h1 className="parallax-element" style={{ textAlign: 'end' }}>
              「盲人可以影相？唔係嘛 ......」
              <br/>
              你是否也在這樣想？
            </h1>
          </div>
          <div className="column paragraph">
            <p className="parallax-element">
              我，曾經也有這樣的想法。
              <br/><br/>
              但在 2019 年，和 DBS星展銀行合作的一項企劃中，我有了 新的看法。
              <br/><br/>
              當日我們走訪香港不同社企，其中一間，便是今次相展的協辦方，一間推廣盲攝的社企 Sightfeeling 盲蹤踪。
              <br/><br/>
              用硫磺氣味去拍攝煙火，聆聽蹄聲以攝下羊的倒影，感知風向拍出山澗光景，從他們其中一位創辦人 Fishing 和一位視障攝影師郭建口中，娓娓道出看似不可能的盲攝經歷。我邊拿著他們的作品，邊打從心內感嘆，亦不禁為自己的無知而感到慚愧。
              <br/><br/>
              自此開始，每每朋友同事家人間的聚會，只要未問過，我總會一臉認真向大家問以下這問題：「你知唔知呢？其實盲人係可以影相㗎？專業攝影師嗰隻......」不知是笑我板著臉的演繹，還是以為我說的是黑色幽默，開首總是伴著一小陣笑聲。直至當大家聽完我的分享後，大家或多或少都會對一班視障攝影師肅然起敬。那一剎那，我感到，我改變了什麼。
            </p>
          </div>
          <div className="column paragraph">
            <p className="parallax-element">
              我亦記得，當時正值我創立「電笠」之初。
              <br/><br/>
              電笠，日文漢字，意即燈罩。我認為每人因應自身閱歷，都是一個擁有不同花紋的燈罩，可以把同一種光源，映照出不同的光紋，訴說不一樣的故事。我希望「電笠」能包容來自不同地域及範疇的人，交流藝術、文化、潮流，成為一個 和而不同的華文平台，聆聽當代的聲音。
              <br/><br/>
              當中固然也 包括一眾視障人士的聲音。
              <br/><br/>
              盲蹤踪的視障攝影師雖然視力有缺失，但卻用上其他感官，拍攝出一張張充滿個人特色及感染力的影像故事，正正跟「電笠」的宗旨不謀而合，故「電笠 X Sightfeeling 盲蹤踪」的攝影展企劃也順理成章地展開。
              <br/><br/>
              在此感謝 DBS 及華納的支持，成就了是次攝影展。
              <br/><br/>
              我們在這年代，長期處於沈鬱狀態下，往往亦都忘記自己的一小步，可以幫助別人，改變世界；
              <br/>
              希望藉此相展，無論是社企、歌手或銀行職員，都可以在自己的崗位上，展開一個個能感動人的故事。
              <br/><br/>
              也希望你看畢後，也跟身邊的人說說：「其實視障亦能成為出色的攝影師。」
            </p>
          </div>
          <div className="column" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <img className="dl-logo parallax-element" src={require('../assets/images/dl-logo.png').default}/>
            <p className="parallax-element" style={{ textAlign: 'end' }}>
              電笠 總監
              <br/>
              王  昱
            </p>
          </div>
          <div className="column moment-of-purpose"> 
            <img className="parallax-element" src={require('../assets/images/moment-of-purpose.svg').default}/>
            <p className="parallax-element" style={{ textAlign: 'end' }}>
              一眾視障攝影師  ✕  Fiona 薛凱琪   Janice 衛蘭   JUDE 曾若華   Jill 衛詩
              <h1 className="parallax-element">疫情下，用鏡頭看世界</h1>
              <h5 className="parallax-element">
                6月15日-7月5日
                <br/>
                MOKO 旺角新世紀廣場L1樓層
              </h5>
            </p>
          </div>
        </div>

        <div id='content-dbs' className='content-container'>
          <img className="bg parallax-element" src={require('../assets/images/dbs-bg.png').default}/>
          <Sep/>
          <div className="dbs-feature">
            <img className="parallax-element" src={require('../assets/photos/dbs-0.jpg').default}/>
            <p className="parallax-element">About 盲蹤踪 Sightfeeling </p>
          </div>
          <div>
            <div className='title parallax-element'>
              <img src={require('../assets/images/title-dbs.svg').default}/>
            </div>
            <InfoBox>
              <p className='parallax-element'>
                「盲蹤踪 Sightfeeling」是由年青人與視障人士組成的香港社企，
                希望以「感官攝影」突破大眾對視障人士的固有了解和認知，
                利用藝術創作展現他們的才華。除此之外，還主力製作多感官明信片、
                舉辦展覽和不同形式的公眾教育活動，及至 2020年
                更獲得 DBS Social Impact Prize 獎項，盼能進一步開創社會對
                不同人士的無界限想像。
              </p>
            </InfoBox>
            <div className="contact-us">
              <p className='parallax-element' style={{ color: '#313131' }}>
                如有意購買盲蹤踪多感官明信片，
                <br/>
                請即聯絡我們 <FiMail style={{ fontSize: '1.2em', transform: 'translateY(0.15em)' }} />
              </p>
              <p className='parallax-element'>
                多謝您，與我們一起展出大意義。
              </p>
            </div>
          </div>
          <img className="human" src={require('../assets/images/human-3.svg').default}/>
        </div>
        
        <div id='content-dbs-album' className='content-container'>
          <div>
            <div className='red-gradient parallax-element' style={{ width: '12em', left: '10em', top: '0.5em'}} />
            <div className='red-gradient parallax-element' style={{ width: '12em', height: '2.5em', left: '10.3em', top: '4em'}}/>
            <div className='red-gradient is-flip parallax-element' style={{ width: '12em', height: '2em', left: '0em', top: '1.5em'}}/>
            <div className='red-gradient parallax-element' style={{ width: '10.5em', left: '9em', top: '2.6em'}}/>
            <div className='red-gradient is-flip parallax-element' style={{ width: '12em', height: '3em', left: '0.5em', top: '3.7em'}}/>
            <div className='red-gradient parallax-element' style={{ width: '11em', height: '3em', left: '8em', top: '6.5em'}}/>
            <div className='red-gradient is-flip parallax-element' style={{ width: '12em', height: '2.5em', left: '2em', top: '6em'}}/>
            <img className='dbs-banner parallax-element' src={require('../assets/images/dbs-banner.png').default} />
            <div className='title parallax-element'>
              別看輕自己，因每天都有很多人像你一樣，默默地為社會行出一小步。
              <br/>
              每一小步，都也舉足輕重；每一剎那，都能展出大意義。
              <br/>
              即使世界存在著許多不完美，但只要齊心合力，我們便可以將之修補。
              <br/>
              <a href="https://www.dbs.com/livemore/hk-zh/momentofpurpose.html?utm_source=DL&utm_medium=onlinegallery&utm_content=momentofpurpose&utm_campaign=portraits_of_purpose" target="_blank" className='parallax-element'>
                <h1>點擊相片 細閱 每一個展出大意義的故事</h1>
              </a>
            </div>
            <div className='row photos-container'>
              <div>
                <a href="https://www.dbs.com/livemore/hk-zh/inspirations/dbs-pb-story.html?utm_source=DL&utm_medium=onlinegallery&utm_content=pb-story&utm_campaign=portraits_of_purpose" target="_blank" className='parallax-element'>
                  <img className='photo' style={{ height: '2.4em' }} src={require('../assets/photos/dbs-1.jpg').default}/>
                </a>
                <a href="https://www.dbs.com/livemore/hk-zh/inspirations/dbs-void-story.html?utm_source=DL&utm_medium=onlinegallery&utm_content=void-story&utm_campaign=portraits_of_purpose" target="_blank">
                  <img className='photo parallax-element' style={{ height: '2.2em' }} src={require('../assets/photos/dbs-2.jpg').default}/>
                </a>
              </div>
              <div>
              <a href="https://www.dbs.com/livemore/hk-zh/inspirations/dbs-klook-story.html?utm_source=DL&utm_medium=onlinegallery&utm_content=klook-story&utm_campaign=portraits_of_purpose" target="_blank" className='parallax-element'>
                  <img className='photo' style={{ height: '2em' }} src={require('../assets/photos/dbs-3.jpg').default}/>
                </a>
                <a href="https://www.dbs.com/livemore/hk-zh/inspirations/dbs-treasures-story.html?utm_source=DL&utm_medium=onlinegallery&utm_content=treasures-story&utm_campaign=portraits_of_purpose" target="_blank" className='parallax-element'>
                  <img className='photo' style={{ height: '2em' }} src={require('../assets/photos/dbs-4.jpg').default}/>
                </a>
              </div>
            </div>
          </div>
          <div className='photos-container'>
            <div className='column'>
              <div className='row' style={{ alignItems: 'flex-end' }}>
                <div>
                  <img className='photo parallax-element' style={{ height: '2em' }} src={require('../assets/photos/dbs-5.jpg').default}/>
                  <img className='photo parallax-element' style={{ height: '1.8em' }} src={require('../assets/photos/dbs-6.jpg').default}/>
                </div>
                <div>
                  <div className='row' style={{ alignItems: 'flex-end' }}>
                    <img className='photo parallax-element' style={{ height: '1.7em' }} src={require('../assets/photos/dbs-8.jpg').default}/>
                    <img className='photo parallax-element' style={{ height: '2.3em' }} src={require('../assets/photos/dbs-10.jpg').default}/>
                  </div>
                  <div className='row'>
                    <img className='photo parallax-element' style={{ height: '2em' }} src={require('../assets/photos/dbs-9.jpg').default}/>
                    <a href="https://www.dbs.com/livemore/hk-zh/inspirations/dbs-tpc-story.html?utm_source=DL&utm_medium=onlinegallery&utm_content=tpc-story&utm_campaign=portraits_of_purpose" target="_blank" className='parallax-element'>
                      <img className='photo' style={{ height: '2.3em' }} src={require('../assets/photos/dbs-12.jpg').default}/>
                    </a>
                  </div>
                </div>
              </div>
              <div className='row'>
                <img className='photo parallax-element' style={{ height: '1.8em' }} src={require('../assets/photos/dbs-7.jpg').default}/>
                <img className='photo parallax-element' style={{ height: '1.8em' }} src={require('../assets/photos/dbs-11.jpg').default}/>
                <img className='photo parallax-element' style={{ height: '2.7em' }} src={require('../assets/photos/dbs-13.jpg').default}/>
              </div>
            </div>
          </div>
        </div>

        <div id='content-org' className='content-container' style={{ paddingTop: 0 }}>
          <div className="app-info parallax-element">
            <img src={require('../assets/images/dl-bg-small.png').default}/>
            <div className="flex-fill parallax-element">
              <div className='org'>
                主辦及策展
                <div className='org-logo-wrapper'>
                  <img style={{ height: '6em' }} src={require('../assets/images/dl-logo.png').default}/>
                </div>
                <div className="dl-text">全新華文生活平台</div>
              </div>
            </div>
            <div className="download flex-fill parallax-element" style={{ justifyContent: 'flex-start' }}>
              <p style={{ marginTop: 'auto' }}>
                立即下載
              </p>
              <div className='row'>
                <a href="" target="_blank">
                  <div className="download-ios download-button"/>
                </a>
                <a href="" target="_blank">
                  <div className="download-android download-button"/>
                </a>
              </div>
            </div>
          </div>
          <div className="sight parallax-element">
            <img src={require('../assets/images/sight-bg.png').default}/>
            <div className="flex-fill parallax-element">
              <div className='org'>
                協辦
                <div className='org-logo-wrapper'>
                  <img style={{ height: '5em' }} src={require('../assets/images/sight-logo-white.svg').default}/>
                </div>
              </div>
            </div>
          </div>
          <div className='org-wrapper'>
            <div className='org parallax-element'>
              呈獻
              <div className='org-logo-wrapper'>
                <img style={{ height: '3em' }} src={require('../assets/images/dbs-logo.svg').default}/>
              </div>
            </div>
            <div className='org parallax-element'>
              器材贊助
              <div className='org-logo-wrapper'>
                <img style={{ height: '1.2em' }} src={require('../assets/images/bw-logo.svg').default}/>
              </div>
            </div>
            <div className='org parallax-element'>
              受惠機構
              <div className='org-logo-wrapper'>
                <img style={{ height: '5.8em' }} src={require('../assets/images/hkgda-logo.svg').default}/>
              </div>
            </div>
          </div>
        </div>
      
        <div id='content-end' className='content-container'>
          <p className='parallax-element'>生活是一個開引號</p>
          <div style={{ position: 'absolute', height: 'calc(50% + 30px)', bottom: 0 }}>
            <Sep isAutoHeight/>
          </div>
        </div>

      </div>
    </div>
  );
}


export default Gallery;
