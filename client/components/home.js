import React, { useState } from 'react';
import RegionSelector from './homeComponents/regionSelector';
import StretchDisplay from './homeComponents/stretchDisplay';
import SavedStretches from './homeComponents/savedStretches';
import Routines from './homeComponents/routines';
import '../stylesheets/home.scss';

const Home = () => {
  return (
    <>
      <div id="main-flex">
        <div className="dynamic-direction">
          <RegionSelector />
          <StretchDisplay />
        </div>
        {/* <div class="dynamic-direction">
          <SavedStretches />
          <Routines />
        </div> */}
      </div>
    </>
  );
};

export default Home;
