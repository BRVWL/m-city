import React from 'react';
import Featured from './Featured';
import Matches from './Matches';

const Home = props => {
  return (
    <div className="bck_blue">
      <Featured />
      <Matches />
    </div>
  );
};

export default Home;
