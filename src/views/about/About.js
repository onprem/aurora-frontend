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
            Aurora is the annual cultural festival of ABV-IIITM, Gwalior, an autonomous institute of
            Government of India. Coupled with the legacy of fellowship and pride, Aurora is one of
            the largest collegiate festival celebrations in central India, hence one of the most
            eagerly anticipated events in the institute calender. It attracts a whooping 10,000+
            students from more than 70 colleges all over the country. In past, Aurora has been a
            festive affair to part off and an exclusive stage for the best of the artists,
            performers and show stoppers. Aurora&apos;20 is ready to bewitch the hearts of the
            masses with an idiosyncartic blend of shimmer, mystique, stupendous talent, breathtaking
            performances, enrapturing panache, unnerving bands, aesthetic dance moves, soulful
            moves, top-notch art and sublime actors.
          </p>
        </div>
      </div>
      <Particles />
      {isDesktop && <Social fill="#000000" />}
    </>
  );
};
export default About;
