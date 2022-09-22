import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleViewingFavorites } from '../../reducers/userReducer';
import '../../stylesheets/stretchDisplay.scss';
import StretchDisplayWindow from './subComponents/stretchDisplayWindow';
// import savedStretches from '.'

const StretchDisplay = () => {
  const { isViewingFavorites } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="stretchDisplay">
      {isViewingFavorites ? (
        <>
          <h3>Favorite Stretches</h3>
          <button onClick={() => dispatch(toggleViewingFavorites())}>
            View Selected Stretches
          </button>
        </>
      ) : (
        <>
          <h3>Display For Selected Stretches</h3>
          <button onClick={() => dispatch(toggleViewingFavorites())}>
            View Favorite Stretches
          </button>
        </>
      )}

      <StretchDisplayWindow />
    </div>
  );
};

export default StretchDisplay;
