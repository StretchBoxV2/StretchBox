import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './stylesheets/App.scss';
import Home from './components/home';
import Login from './components/login';
import { Provider } from 'react-redux';
import store from './store.js';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Provider>
  );
};

export default App;
