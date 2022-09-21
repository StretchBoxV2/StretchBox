import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './stylesheets/App.scss';
import { PrivateRoutes } from './components/privateRoutes';
import Home from './components/home';
import Login from './components/login';
import { Provider } from 'react-redux';
import store from './store.js';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
