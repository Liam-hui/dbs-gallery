import React, { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import ScrollMagic from "scrollmagic";
// import "../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

import FeatureImage from '@/components/FeatureImage'
import Content from '@/components/Content'
import Sep from '@/components/Sep'
import InfoBox from '@/components/InfoBox'

import { FiMail } from "react-icons/fi";

function Gallery({ canScroll }) {

  const controller = new ScrollMagic.Controller({ vertical: false });

  useEffect(() => {

    // parallax scrolling
    const parallaxElements = document.querySelectorAll(".parallax-element");
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

  return (
    <div id="gallery-container" 
      ref={scrollRef} 
      onWheel={!isMobile && canScroll ? onWheel : null}
      style={{ overflowX: canScroll ? 'scroll' : 'hidden' }}
    >
      <div id="scroll-content">

        <div id='bg-start'>
          <img src={require('../../assets/images/bg_start.png').default}/>
        </div>

        <div id="intro">
          <div id="banner">
            <img src={require('../../assets/images/banner.png').default}/>
          </div>
          <p>
            一眾視障攝影師
            <br/>
            ✕
            <br/>
            Fiona 薛凱琪
            <br/>
            Janice 衛蘭
            <br/>
            JUDE 曾若華
            <br/>
            Jill 衛詩
            <h1>疫情下，用鏡頭看世界。</h1>
            <img className="rays" src={require('../../assets/images/rays.png').default}/>
          </p>
        </div>
        
        <FeatureImage index={1}>
          <div className="line" data-x="0.95" data-y="0.4" data-height="0.2"/>
          <div className="photoCreditText">攝影：盲蹤踪攝影師 Cathy</div>
        </FeatureImage>

        <div id={'content-1'} className='content-container'>
          <Sep/>
          <div>
            <div className='column'>
              <div className='title parallax-element'>
                <b>過去這一年，</b>你過得怎樣？
              </div>
              <div className="storyCreditText">Photo Stories by Fiona</div>
              <div className='row' style={{ zIndex: 10 }}>
                <img className='photo' src={require('../../assets/photos/photo1.1.png').default}/>
                <img className='photo' src={require('../../assets/photos/photo1.1.png').default}/>
                <img className='photo' src={require('../../assets/photos/photo1.1.png').default}/>
                <img className='photo' src={require('../../assets/photos/photo1.1.png').default}/>
                <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
              </div>
            </div>
            <InfoBox style={{ alignSelf: 'flex-start' }} audio learnMore parallax offset={0}>
              <div class="row">
                <p>
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
                  </b>
                </p>
                <div>
                  <p><b>
                    盲蹤踪攝影師 Cathy
                    <br/>
                    鏡頭下的薛凱琪
                  </b></p>
                  <img src={require('../../assets/photos/photo1.00.png').default}/>
                </div>
              </div>
            </InfoBox>
          </div>
          <div className='video-wrapper'>
            <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
          </div>
        </div>

        <FeatureImage index={2}/>

        <div id={'content-2'} className='content-container'>
          <div>
            <div className='column'>
              <div className='title parallax-element'>
                <b>我們好像失去了很多東西。</b>
                <br></br>
                但只要直面觀照內心，定必有所得。
              </div>
              <div className="storyCreditText">Photo Stories by Fiona</div>
                <div className='row' style={{ zIndex: 10 }}>
                  <img className='photo' src={require('../../assets/photos/photo1.1.png').default}/>
                  <img className='photo' src={require('../../assets/photos/photo1.2.png').default}/>
                  <img className='photo isHorizontal' src={require('../../assets/photos/photo1.3.png').default}/>
                  <img className='photo isHorizontal' src={require('../../assets/photos/photo1.4.png').default}/>
                  <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
                </div>
            </div>
            <InfoBox style={{ alignSelf: 'flex-start', display: 'inline-block' }} learnMore parallax offset={0}>
              <div className="row">
                <p>
                  <br/>
                  每一次看見鷹在天上飛翔的時候，
                  <br/>
                  Janice 也感到非常自由。
                  <br/>
                  每當早上太陽出來的時侯，內心便充滿希望。
                  <br/>
                  散落滿地的花朵，看似沒有用途的東西，
                  <br/>
                  也可發現它之美。
                  <br/>
                  Janice 最喜歡小朋友玩樂時的
                  <br/>
                  表情天真爛漫，
                  <br/>
                  完全沒任何計算。
                  <br/>
                  <b>
                    Janice 以素臉示人，
                    <br/>
                    向大家表現最自信及真實一面。
                  </b>
                </p>
                <div className="feature">
                  <p><b>
                    盲蹤踪攝影師 郭健
                    <br/>
                    鏡頭下的衛蘭
                  </b></p>
                  <img src={require('../../assets/photos/photo2.00.png').default}/>
                </div>
              </div>
            </InfoBox>
          </div>
          <div className='video-wrapper parallax-element'>
            <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
          </div>
        </div>

        <FeatureImage index={3}/>

        <div id={'content-3'} className='content-container'>
          <div>
            <div className='title parallax-element'>
              世界很大，留住快樂記憶，準備好再出發
            </div>
            <div className='row'>
              <div className='video-wrapper parallax-element'>
                <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
              </div>
              <InfoBox style={{ alignSelf: 'flex-start' }} audio learnMore parallax offset={0}>
                <div class="row">
                  <p>
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
                      我們可籍此做足準備，當時機來臨，
                      <br/>
                      自能再次起航，邁向世界。
                    </b>
                  </p>
                  <div className="row">
                    <div className="photo-container-1">
                      <div className="storyCreditText">Photo Stories by JUDE</div>
                      <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
                      <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
                      <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
                    </div>
                    <div className="photo-container-2">
                      <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
                      <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
                      <img className='photo' src={require('../../assets/photos/photo1.png').default}/>
                    </div>
                  </div>
                </div>
                <div className="feature">
                  <img src={require('../../assets/photos/photo1.00.png').default}/>
                  <p><b>
                    盲蹤踪攝影師 Cathy
                    <br/>
                    鏡頭下的薛凱琪
                  </b></p>
                </div>
              </InfoBox>
            </div>
          </div>
        </div>

        <FeatureImage index={4}/>

        <div id={'content-4'} className='content-container'>
          <div className='parallax-element' style={{ height: window.innerHeight - 70, marginTop: 'auto'}}>
            <Sep/>
          </div>
          <div>
            <div className="row">
              <div className='title parallax-element'>
                再行多一步，從自身，
                <br/>
                <b>走到社區，關懷身邊人</b>
              </div>
              <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
            </div>
            <div className="row row-2">
              <div>
                <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
                <div className="storyCreditText">Photo Stories by Jill</div>
              </div>
              <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
              <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
              <img className='photo isHorizontal' src={require('../../assets/photos/photo1.5.png').default}/>
            </div>
            <InfoBox style={{ alignSelf: 'flex-start' }} audio learnMore parallax offset={0}>
              <div class="row">
                <p>
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
                  Jill 從表演舞台，走到日常社區，
                  <br/>
                  不論是明星歌手，又或任何身分，
                  <br/>
                  <b>
                    一小個動作，也可以對身邊人，
                    <br/>
                    起著莫大影響。
                  </b>
                </p>
                <div className="feature">
                  <p><b>
                    盲蹤踪攝影師 Cathy
                    <br/>
                    鏡頭下的薛凱琪
                  </b></p>
                  <img src={require('../../assets/photos/infoPhoto4.png').default}/>
                </div>
              </div>
            </InfoBox>
          </div>
          <div className='video-wrapper parallax-element'>
            <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
          </div>
        </div>

        {/* <Content index={5}>
          <div>
            <div className='row vertical-margin heading parallax-element'>
              <img src={require('../../assets/images/dbs_logo.png').default}/>
              與你同行
            </div>
            <div className='video-wrapper large-video parallax-element'>
              <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
            </div>
          </div>
          <div className='title parallax-element' style={{ '--offset': -700 }}>
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
        
                  <div id='contact-us'>
            <div className='heading parallax-element'>
              如欲有意購買明信片，
              <br></br>
              請即聯絡
              <img src={require('../../assets/icons/icon-mail.png').default}/>
            </div>
          </div>
          */}

        <div id={'content-dl'} className='content-container'>
          <div className="column">
            <img className="dl-logo" src={require('../../assets/images/dl_logo.png').default}/>
            <h1>
              「盲人可以影相？唔係嘛 ......」
              <br/>
              你是否也在這樣想？
            </h1>
          </div>
          <div className="column paragraph">
            <p>
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
            <p>
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
          <div className="column" style={{ justifyContent: 'flex-start' }}>
            <h1>
              多一分了解，相信自己的能力，
              <br/>
              為社會行多一步，你我也能展出大意義。
            </h1>
            <p>
              電笠 總監
              <br/>
              王  昱
            </p>
            {/* <div className="download">
              <p>
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
              <a href="https://www.facebook.com/DL.theVOC/" target="_blank">
                <div className='row'>
                  <div className="icon facebook-icon"/>
                  facebook.com/DL.theVOC
                </div>
              </a>
              <a href="https://www.instagram.com/dl.thevoc/" target="_blank">
                <div className='row'>
                  <div className="icon instagram-icon"/>
                  instagram.com/dl.thevoc/
                </div>
              </a>
            </div> */}
          </div>
        </div>

        <div id='content-dbs' className='content-container'>
          <img className="bg" src={require('../../assets/images/dl_sight_bg.png').default}/>
          <div className="dbs-feature" >
            <img src={require('../../assets/photos/dbs_0.png').default}/>
            <p>About 盲蹤踪 Sightfeeling </p>
          </div>
          <div>
            <div className='title'>
              即使身體有缺失，
              <br/>
              也不代表在<b>日常生活中缺席</b>
            </div>
            <InfoBox>
              <p>
                「盲蹤踪 Sightfeeling」是由年青人與視障人士組成的香港社企，
                希望以「感官攝影」突破大眾對視障人士的固有了解和認知，
                利用藝術創作展現他們的才華。除此之外，還主力製作多感官明信片、
                舉辦展覽和不同形式的公眾教育活動，及至 2020年
                更獲得 DBS Social Impact Prize 獎項，盼能進一步開創社會對
                不同人士的無界限想像。
              </p>
            </InfoBox>
            <div className="contact-us">
              <p style={{ color: '#313131' }}>
                如有意購買盲蹤踪多感官明信片，
                <br/>
                請即聯絡我們 <FiMail style={{ fontSize: '1.2em', transform: 'translateY(0.15em)' }} />
              </p>
              <p>
                多謝您，與我們一起展出大意義。
              </p>
            </div>
          </div>
        </div>
        
        <div id='content-dbs-album' className='content-container'>
          <div>
            <div className='red-gradient parallax-element' style={{ width: '12em', left: '10em', top: '0.5em'}} />
            <div className='red-gradient parallax-element' style={{ width: '12em', height: '2.5em', left: '10.3em', top: '4em'}}/>
            <div className='red-gradient is-flip parallax-element' style={{ width: '12em', height: '2em', left: '2em', top: '2.5em'}}/>
            <div className='red-gradient parallax-element' style={{ width: '10.5em', left: '9em', top: '2.6em'}}/>
            <div className='red-gradient is-flip parallax-element' style={{ width: '12em', height: '3em', left: '0.5em', top: '3.7em'}}/>
            <div className='red-gradient parallax-element' style={{ width: '11em', height: '3em', left: '8em', top: '6.5em'}}/>
            <div className='red-gradient is-flip parallax-element' style={{ width: '12em', height: '2.5em', left: '2em', top: '6em'}}/>
            <img className='dbs-banner parallax-element' src={require('../../assets/images/dbs_banner.png').default} />
            <div className='title parallax-element'>點擊相片 細閱 每一個展出大意義的故事</div>
            <div className='row photos-container'>
              <div>
                <img className='photo parallax-element' style={{ width: '3em', height: '3em', marginLeft:'auto' }} src={require('../../assets/photos/photo1.5.png').default}/>
                <img className='photo parallax-element' style={{ width: '3.5em', height: '2.3em' }} src={require('../../assets/photos/photo1.5.png').default}/>
              </div>
              <div>
                <img className='photo parallax-element' style={{ width: '2.7em', height: '1.8em' }} src={require('../../assets/photos/photo1.5.png').default}/>
                <img className='photo parallax-element' style={{ width: '2.6em', height: '1.7em' }} src={require('../../assets/photos/photo1.5.png').default}/>
              </div>
              <div>
                <img className='photo parallax-element' style={{ width: '3.6em', height: '2.3em' }} src={require('../../assets/photos/photo1.5.png').default}/>
                <img className='photo parallax-element' style={{ width: '3em', height: '2em' }} src={require('../../assets/photos/photo1.5.png').default}/>
              </div>
            </div>
          </div>
          <div className='photos-container'>
            <div className='row' style={{ alignItems: 'flex-end' }}>
              <img className='photo parallax-element' style={{ width: '3em', height: '2em' }} src={require('../../assets/photos/photo1.5.png').default}/>
              <img className='photo parallax-element' style={{ width: '3em', height: '2em' }} src={require('../../assets/photos/photo1.5.png').default}/>
              <img className='photo parallax-element' style={{ width: '3.5em', height: '2.3em' }} src={require('../../assets/photos/photo1.5.png').default}/>
            </div>
            <div className='row'>
              <div>
                <img className='photo parallax-element' style={{ width: '3.3em', height: '2em' }} src={require('../../assets/photos/photo1.5.png').default}/>
                <img className='photo parallax-element' style={{ width: '3.5em', height: '2.3em' }} src={require('../../assets/photos/photo1.5.png').default}/>
              </div>
              <div>
                <img className='photo parallax-element' style={{ width: '2.5em', height: '4.1em' }} src={require('../../assets/photos/photo1.5.png').default}/>
              </div>
              <div>
                <img className='photo parallax-element' style={{ width: '4em', height: '3em' }} src={require('../../assets/photos/photo1.5.png').default}/>
              </div>
            </div>
          </div>
        </div>

        <div id={'content-org'} className='content-container' style={{ paddingTop: 0 }}>
          <div className="app-info">
            <img src={require('../../assets/images/app_bg.png').default}/>
            <div class="flex-fill parallax-element">
              <div className='org'>
                主辦及策展
                <div id="dbs-logo" class="logo"/>
              </div>
            </div>
            <div class="download flex-fill parallax-element" style={{ justifyContent: 'flex-start' }}>
              <div>
                <a href="https://www.facebook.com/DL.theVOC/" target="_blank">
                  <div className='row'>
                    <div className="icon facebook-icon"/>
                    facebook.com/DL.theVOC
                  </div>
                </a>
                <a href="https://www.instagram.com/dl.thevoc/" target="_blank">
                  <div className='row'>
                    <div className="icon instagram-icon"/>
                    instagram.com/dl.thevoc/
                  </div>
                </a>
              </div>
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
          <div className="mountain">
            <img src={require('../../assets/images/mountain_bg.png').default}/>
            <div class="flex-fill parallax-element">
              <div className='org'>
                協辦
                <div id="dbs-logo" class="logo"/>
              </div>
            </div>
          </div>
          <div className='org-wrapper'>
            <div className='org parallax-element'>
              呈獻
              <div id="dbs-logo" class="logo"/>
            </div>
            <div className='org parallax-element'>
              特別鳴謝
              <div id="warner-logo" class="logo"/>
            </div>
            <div className='org parallax-element'>
              場地贊助
              <div id="moko-logo" class="logo"/>
            </div>
            <div className='org parallax-element'>
              受惠機構
              <div id="hkgda-logo" class="logo"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Gallery;
