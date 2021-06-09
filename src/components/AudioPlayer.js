import React, { useState, useEffect, useRef } from 'react';
import { MdPlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";

const AudioPlayer = ({ audio }) => {

  const audioRef = useRef( new Audio(audio) );
  const intervalRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
    }
  }, [])

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
    clearInterval(intervalRef.current);
    audioRef.current = new Audio(audio);
  }, [audio])

  const onPlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
    setIsPlaying(!isPlaying);
  }

  const startTimer = () => {
	  clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
      } 
      else if (audioRef.current.currentTime) {
        setCurrentTime(audioRef.current.currentTime)
        setProgress(audioRef.current.currentTime / audioRef.current.duration * 100);
      } 
    }, [100]);
	}

  const [progress, setProgress] = useState(0);

  const onChange = (e) => {
    setProgress(e.target.value);
    const time = audioRef.current.duration * e.target.value / 100;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  const onMouseDown = () => {
    clearInterval(intervalRef.current);
  }

  const onMouseUp = () => {
    if (isPlaying) {
      startTimer();
    }
  }

  const addZero = (value) => value < 10 ? '0' + value : value;
  const min = addZero( Math.floor(currentTime / 60) );
  const sec = addZero( Math.floor(currentTime) % 60 );

  return (
    <div className='audio-player'>
      <div className='play-button' onClick={onPlayPause}>
        <MdPlayCircleFilled color={'#5c5454'} style={{ opacity: isPlaying ? 0 : 1 }}/>
        <MdPauseCircleFilled color={'#5c5454'} style={{ opacity: isPlaying ? 1 : 0 }}/>
      </div>
      <div className='audio-time'>{`${min}:${sec}`}</div>
      <div className='audio-track'>
        <input type="range" min="0" max="100" class="audio-slider" value={progress} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onChange={onChange}/>
        <div className='audio-progress' style={{ width: `${parseFloat(progress) + 1}%` }} />
      </div>
    </div>
  )

}

export default AudioPlayer;
