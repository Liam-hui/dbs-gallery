import React from 'react';

export default function ArtistPhoto(props) {

  const { index, children } = props;

  return (
    <div 
      className='artist-photo-wrapper lines-source' 
      id={`artist-photo-${index}`}
      data-index={index}
    >
      <div className='artist-photo'>
        <img src={require(`../assets/photos/artist-${index}.jpg`).default}/>
        {children}
      </div>
    </div>
  );
}

