import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './stylesheets/App.scss';
import Home from './components/home';
import Login from './components/login';
import { Provider } from 'react-redux';
import store from './store.js';
import Header from './components/homeComponents/header';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login register={true} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Provider>
  );
};

export default App;
