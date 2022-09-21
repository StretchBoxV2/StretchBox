import React, { useState } from 'react';
import RegionSelector from './homeComponents/regionSelector';
import StretchDisplay from './homeComponents/stretchDisplay';
import SavedStretches from './homeComponents/savedStretches';
import Routines from './homeComponents/routines';
import '../stylesheets/home.scss';

const Home = () => {
  const [stretchData, setStretchData] = useState('');
  return (
    <>
      <div id="main-flex">
        <div className="dynamic-direction">
          <RegionSelector setStretchData={setStretchData} />
          <StretchDisplay value={stretchData} />
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
