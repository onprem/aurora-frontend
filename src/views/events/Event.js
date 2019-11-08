import React from 'react';
import { Link } from 'react-router-dom';

import style from './event.module.css';

import Card from '../../components/card/Card';
import Carousel from '../../components/Carousel/Carousel';
import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';


import cardData from '../../assets/data/eventData/cardData';
import Logo from '../../assets/icons/auroraLogo.svg';


const Event = () => {
  const isDesktop = useMediaQuery('(min-width: 450px)');

  return (
    <>
      <Link to="/>">
        <img className={style.aurora_logo} src={Logo} alt="logo" />
      </Link>
      <Carousel>
        {cardData.map(event => (
          <Card params={event} />
        ))}
      </Carousel>
      <Particles />
      {isDesktop && <Social fill="#000000" />}
    </>
  );
};
export default Event;
