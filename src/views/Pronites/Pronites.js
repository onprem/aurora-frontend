import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';
import Bat from '../../components/bat/Bat';
import AnimateChealCaowa from '../../utils/chealCaowa';
import Path from '../../components/chealCaowaPath/Path';

import style from './Pronites.module.css';

import logoDark from '../../assets/icons/auroraMono.svg';

import one from '../../assets/images/1.png';
import two from '../../assets/images/2.png';
import three from '../../assets/images/3.png';
import four from '../../assets/images/4.png';
import five from '../../assets/images/5.png';
import six from '../../assets/images/6.png';
import seven from '../../assets/images/7.png';
import eight from '../../assets/images/8.png';
import nine from '../../assets/images/9.png';
import ten from '../../assets/images/10.png';
import eleven from '../../assets/images/11.png';

const celebs = [one, two, three, four, five, six, seven, eight, nine, ten, eleven];

const Pronites = () => {
  const isDesktop = useMediaQuery('(min-width: 450px)');
  useEffect(() => {
    const bat1 = document.getElementById('bat1');
    const bat2 = document.getElementById('bat2');
    const bat3 = document.getElementById('bat3');
    const path1 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
      Math.floor(Math.random() * 17)
    ];
    const path2 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
      Math.floor(Math.random() * 17)
    ];
    const path3 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
      Math.floor(Math.random() * 17)
    ];

    const chealCaowa1 = new AnimateChealCaowa(path1, bat1, 200, 0, 0.0003);
    const AnimateChealCaowaFrame1 = requestAnimationFrame(chealCaowa1.moveBat);
    const chealCaowa2 = new AnimateChealCaowa(path2, bat2, 200, 0, 0.0003);
    const AnimateChealCaowaFrame2 = requestAnimationFrame(chealCaowa2.moveBat);
    const chealCaowa3 = new AnimateChealCaowa(path3, bat3, 200, 0, 0.0003);
    const AnimateChealCaowaFrame3 = requestAnimationFrame(chealCaowa3.moveBat);
    return () => {
      window.cancelAnimationFrame(AnimateChealCaowaFrame1);
      window.cancelAnimationFrame(AnimateChealCaowaFrame2);
      window.cancelAnimationFrame(AnimateChealCaowaFrame3);
    };
  }, []);

  const Celebrities = () =>
    celebs.map((celeb, index) => (
      <div key={`Celeb ${index}`}>
        <img alt="Celeb" src={celeb} className={style.frame} />
      </div>
    ));

  return (
    <>
      <div className={style.pronites_container}>
        <Link to="/">
          <img src={logoDark} alt="Aurora logo dark" className={style.pronites_logo_dark} />
        </Link>

        <h1 className={style.heading}>PAST CELEBRITIES</h1>
        <div className={style.frame_container}>
          <Celebrities />
        </div>
      </div>
      <Particles />
      <Path width="100px" height="100px" />
      <div className="bat_div">
        <Bat className={style.contact_ChealCaowa} id="bat1" key="1" />
        <Bat className={style.contact_ChealCaowa} id="bat2" key="2" />
        <Bat className={style.contact_ChealCaowa} id="bat3" key="3" />
      </div>
      {isDesktop && <Social fill="#000000" />}
    </>
  );
};
export default Pronites;
