import React from 'react';

import './nav.css';
import background from '../../assets/images/nav_background.jpg';

const navStyle = {
  background: `url(${background})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: `center`,
  filter: `blur(14px)`,
};

const Nav = () => {
  return (
    <div className="nav_container">
      <nav className="nav">
        <div className="nav_bg_image" style={navStyle} />
        <ul className="nav_ul">
          <li className="nav_li">Home</li>
          <li className="nav_li">About</li>
          <li className="nav_li">Events</li>
          <li className="nav_li">Pronites</li>
          <li className="nav_li">Accomodation</li>
          <li className="nav_li">Login/Register</li>
          <li className="nav_li">Team</li>
          <li className="nav_li">Sponsors</li>
          <li className="nav_li">Contact Us</li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
