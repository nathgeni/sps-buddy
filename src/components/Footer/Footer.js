import React from 'react';

import logo from '../../assets/images/tafe-logo.png';

const footer = (props) => {
  return (
    <div id="footer-container">
      <div className="footer">
        <div className="container">
          <div id="logo-container">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default footer;
