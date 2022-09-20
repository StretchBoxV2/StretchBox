import React, { useEffect, useState, useRef } from 'react';
import '../../../stylesheets/stretchDisplayWindow.scss';
import StretchInfo from './stretchInfo';

const StretchDisplayWindow = ({ value }) => {
  const [stretches, setStretches] = useState([]);
  // const [stretchCounter, setStretchCounter] = useState(0);
  const stretchKey = useRef(0);

  useEffect(() => {
    console.log(value);
    let stretchArr = stretches;
    if (value) {
      for (let i = 0; i < value.length; i++) {
        stretchArr.push(
          <StretchInfo
            key={stretchKey.current}
            name={value[i].name}
            muscle={value[i].muscle}
            instructions={value[i].instructions}
          />
        );
        stretchKey.current++;
      }
    }
    setStretches(stretchArr);
  }, [value]);

  return (
    <div className="StretchDisplayWindow">
      <button className="clear-button" onClick={(e) => setStretches([])}>
        CLEAR
      </button>
      <div>{stretches}</div>
    </div>
  );
};

export default StretchDisplayWindow;
