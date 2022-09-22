import React, { useState } from 'react';
import RegionSelector from './homeComponents/regionSelector';
import StretchDisplay from './homeComponents/stretchDisplay';
import '../stylesheets/home.scss';

const Home = () => {
  return (
    <>
      <div id="main-flex">
        <div className="dynamic-direction">
          <RegionSelector />
          <StretchDisplay />
        </div>
      </div>
    </>
  );
};

export default Home;
