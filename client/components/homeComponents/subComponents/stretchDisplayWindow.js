import React, { useEffect } from 'react';
import '../../../stylesheets/stretchDisplayWindow.scss';
import StretchInfo from './stretchInfo';
import { useSelector, useDispatch } from 'react-redux';
import { clearStretches } from '../../../reducers/stretchesReducer';

const StretchDisplayWindow = ({}) => {
  const { stretches } = useSelector((state) => state.stretches);
  const dispatch = useDispatch();

  return (
    <div className="StretchDisplayWindow">
      <button
        className="clear-button"
        onClick={() => dispatch(clearStretches())}
      >
        CLEAR
      </button>
      <div>
        {stretches.map((stretch, idx) => {
          return (
            <StretchInfo
              key={idx}
              name={stretch.name}
              muscle={stretch.muscle}
              instructions={stretch.instructions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StretchDisplayWindow;
