import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, setError, setFavorites } from '../reducers/userReducer';

const Login = ({ register }) => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = register ? '/auth/register' : '/auth/login';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      const data = await res.json();
      if (data.username) {
        dispatch(setUser({ username: data.username, _id: data._id }));
        fetch('/api/favorites')
          .then((res) => res.json())
          .then((data) => {
            dispatch(setFavorites(data));
            navigate('/');
          });
      }
    } catch (err) {
      console.log(err);
      dispatch(setError(true));
      setTimeout(() => dispatch(setError(null)), 5000);
    }
  };
  return (
    <div>
      <h2>{register ? <>Register</> : <>Login</>}</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="username" />
        <input name="password" type="password" />
        <input type="submit" value="Submit" />
      </form>
      {register ? (
        <div>
          Have an account? <Link to={'/login'}>Log in</Link> instead
        </div>
      ) : (
        <div>
          Don't have an account? <Link to={'/register'}>Sign up now!</Link>
        </div>
      )}
      {error && <div>Invalid username or password</div>}
    </div>
  );
};

export default Login;
