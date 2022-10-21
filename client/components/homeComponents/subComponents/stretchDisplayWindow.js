import React, { useEffect } from 'react';
import '../../../stylesheets/stretchDisplayWindow.scss';
import StretchInfo from './stretchInfo';
import { useSelector, useDispatch } from 'react-redux';
import { clearStretches } from '../../../reducers/stretchesReducer';

const StretchDisplayWindow = ({}) => {
  const { stretches } = useSelector((state) => state.stretches);
  const { favorites, isViewingFavorites } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="StretchDisplayWindow">
      {!isViewingFavorites && stretches.length > 0 && (
        <button
          className="clear-button"
          onClick={() => dispatch(clearStretches())}
        >
          CLEAR
        </button>
      )}
      <div>
        {isViewingFavorites
          ? favorites.map((stretch, idx) => {
              return (
                <StretchInfo
                  key={idx}
                  _id={stretch._id}
                  name={stretch.name}
                  muscle={stretch.muscle}
                  instructions={stretch.instructions}
                />
              );
            })
          : stretches.map((stretch, idx) => {
              return (
                <StretchInfo
                  key={idx}
                  _id={stretch._id}
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
