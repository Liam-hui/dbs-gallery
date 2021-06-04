import React, { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export default function Content(props) {

  const { children, style, childrenStyle, index } = props;

  const onResize = () => {
    if (ref.current.offsetWidth > contentWidth)
      setContentWidth(ref.current.offsetWidth)
  }

  const { ref } = useResizeDetector({ onResize });

  const [contentWidth, setContentWidth] = useState(0);

  return (
    <div 
      id={`content-${index}`}
      className='content-container'
      style={{
        "--contentWidth": contentWidth + 'px',
        ... style,
      }}
    >
      {children}
    </div>
  );
}
