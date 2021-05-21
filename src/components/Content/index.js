import React, { useState, useEffect, useCallback } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export default function Content(props) {

  const { children, style, childrenStyle, index } = props;

  const onResize = useCallback((e) => {
    setContentWidth(ref.current.offsetWidth)
  }, []);

  const { ref } = useResizeDetector({ onResize });

  const [contentWidth, setContentWidth] = useState(0);

  return (
    <div 
      id={`content${index}`}
      className='contentContainer'
      style={{
        "--contentWidth": contentWidth + 'px',
        ... style,
      }}
    >
      <div 
        style={{ 
          position: 'absolute',
          ... childrenStyle
        }} 
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
