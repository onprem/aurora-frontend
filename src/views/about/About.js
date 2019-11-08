import React from 'react';
import { Link } from 'react-router-dom';
import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';

import style from './about.module.css';

import logo from '../../assets/icons/auroraLogo.svg';
import logoDark from '../../assets/icons/auroraMono.svg';
import auroraText from '../../assets/icons/auroraText.svg';

const About = () => {
  const isDesktop = useMediaQuery('(min-width: 450px)');
  return (
    <>
      <div className={style.about_container}>
        <Link to="/">
          <img src={logoDark} alt="Aurora logo dark" className={style.about_logo_dark} />
        </Link>
        <div className={style.about_logo_container}>
          <img className={style.about_logo} alt="Aurora logo" src={logo} />
          <img className={style.about_heading} alt="Aurora title" src={auroraText} />
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
      {isDesktop && <Social fill="#000000" />}
    </>
  );
};
export default About;
