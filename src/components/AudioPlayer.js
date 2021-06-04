import React, { useState, useEffect, useRef } from 'react';
import { MdPlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";

const AudioPlayer = () => {

  const audioRef = useRef( new Audio(require('../assets/audios/test.mp3').default) );
  const intervalRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const onPlayPause = () => {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [isPlaying])

  const startTimer = () => {
	  clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setIsPlaying(false);
        setCurrentTime(0);
      } 
      else if (audioRef.current.currentTime) {
        setCurrentTime(audioRef.current.currentTime)
      } 
    }, [100]);
	}

  const progress = `${currentTime / audioRef.current.duration * 100}%`;
  const min = Math.floor(currentTime / 60);
  const sec = Math.floor(currentTime) % 60;
  const addZero = (value) => value < 10 ? '0' + value : value;

  return (
    <div className='audio-player'>
      <div className='audio-button' onClick={onPlayPause}>
        <MdPlayCircleFilled color={'#5c5454'} style={{ opacity: isPlaying ? 0 : 1 }}/>
        <MdPauseCircleFilled color={'#5c5454'} style={{ opacity: isPlaying ? 1 : 0 }}/>
      </div>
      <div className='audio-time'>{`${addZero(min)}:${addZero(sec)}`}</div>
      <div className='audio-track'>
        <div className='audio-progress' style={{ width: progress }} />
      </div>
    </div>
  )

}

export default AudioPlayer;
