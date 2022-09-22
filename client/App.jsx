import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './stylesheets/App.scss';
import Home from './components/home';
import Login from './components/login';
import { Provider, useDispatch } from 'react-redux';
import Header from './components/homeComponents/header';
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/auth/login')
      .then(res => res.json())
      .then(data => dispatch(setUser(data)))
      .catch(() => null)
  }, [])

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
