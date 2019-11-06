import React from 'react';

import style from './about.module.css';

import logo from '../../assets/images/Aurora_Logo.png';
import logoDark from '../../assets/images/Aurora_Logo(Dark).png';

import Particles from '../../components/particles/Particle';

const About = () => {
  return (
    <>
      <div className={style.about_container}>
        <img src={logoDark} alt="Aurora_logo_dark" className={style.about_logo_dark} />
        <div className={style.about_logo_container}>
          <img className={style.about_logo} alt="Aurora_logo" src={logo} />
          <h1 className={style.about_heading}>Aurora&#39;20</h1>
        </div>
        <div className={style.about_para_container}>
          <p className={style.about_para}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <Particles />
    </>
  );
};
export default About;
