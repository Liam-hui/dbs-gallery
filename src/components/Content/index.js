import React, { useState, useEffect, useRef } from 'react';

export default function Content(props) {

  const { children, style, childrenStyle } = props;

  const contentRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    setContentWidth(contentRef.current?.clientWidth)
    setContentHeight(contentRef.current?.clientHeight)
  }, [contentRef.current?.clientWidth]);

  return (
    <div 
      style={{
        height: contentHeight,
        "--contentWidth": contentWidth + 'px',
        ... style,
      }}
    >
      <div 
        style={{ 
          position: 'absolute',
          ... childrenStyle
        }} 
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}
