import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './stylesheets/App.scss';
import Home from './components/home';
import Login from './components/login';
import { Provider, useDispatch } from 'react-redux';
import Header from './components/homeComponents/header';
import { setUser, clearUser, setFavorites } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/auth/login')
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          dispatch(setUser({ username: data.username, _id: data._id }));
          dispatch(setFavorites(data.favorites));
        } else {
          dispatch(clearUser());
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login register={true} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
