import React from 'react';
import '../../../stylesheets/stretchinfo.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../reducers/userReducer';

const StretchInfo = (props) => {
  const { favorites, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addStretchToFavorites = (id) => {
    fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stretch_id: id,
      }),
    }).then((res) => {
      if (res.status === 200)
        dispatch(
          addFavorite({
            _id: id,
            muscle: props.muscle,
            name: props.name,
            instructions: props.instructions,
          })
        );
    });
  };
  const removeStretchFromFavorites = (id) => {
    fetch('/api/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stretch_id: id,
      }),
    }).then((res) => {
      if (res.status === 204) dispatch(removeFavorite(id));
    });
  };

  return (
    <div className="stretch-info">
      {user &&
        (favorites.find((stretch) => stretch._id === props._id) ? (
          // {/* filled heart */}
          <svg
            onClick={() => removeStretchFromFavorites(props._id)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        ) : (
          <svg
            onClick={() => addStretchToFavorites(props._id)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        ))}
      <div className="name-muscle">
        {/* <p>(Debug) ID: {props._id}</p> */}
        <p>
          <strong>Name:</strong> {props.name}
        </p>
        <p>
          <strong>Muscle:</strong> {props.muscle}
        </p>
      </div>
      <div className="instructions">
        <p>
          <strong>Instructions:</strong> {props.instructions}
        </p>
      </div>
    </div>
  );
};
export default StretchInfo;

// {/* unfilled heart */}
// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
//   <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
// </svg>
// {/* filled heart */}
// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
//   <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
// </svg>
