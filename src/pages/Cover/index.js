import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

import Sep from '@/components/Sep'

const Cover = () => {

  return (
    <div id="cover">
      <div>
        生活是個開引號
        <div style={{ position: 'absolute', height: 'calc(50% + 30px)', marginLeft: -30, bottom: 0 }}>
          <Sep/>
        </div>
      </div>
    </div>
  );
}

export default Cover;

