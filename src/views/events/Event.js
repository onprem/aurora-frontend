import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import style from './event.module.css';

import Card from '../../components/card/Card';
import Carousel from '../../components/Carousel/Carousel';
import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';
import cardData from '../../assets/data/eventData/cardData';
import Logo from '../../assets/icons/auroraLogo.svg';
import Bat from '../../components/bat/Bat';
import Path from '../../components/chealCaowaPath/Path';
import AnimateChealCaowa from '../../utils/chealCaowa';

const Event = () => {
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
  return (
    <>
      <Link to="/">
        <img className={style.aurora_logo} src={Logo} alt="logo" />
      </Link>
      <Carousel>
        {cardData.map(event => (
          <Card params={event} />
        ))}
      </Carousel>
      <Particles />
      {isDesktop && <Social fill="#000000" />}
      <Path width="100px" height="100px" />
      <div className="bat_div">
        <Bat className={style.contact_ChealCaowa} id="bat1" key="1" />
        <Bat className={style.contact_ChealCaowa} id="bat2" key="2" />
        <Bat className={style.contact_ChealCaowa} id="bat3" key="3" />
      </div>
    </>
  );
};
export default Event;
