import React from 'react';

import Card from '../../components/card/Card';
import Carousel from '../../components/Carousel/Carousel';
import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';

import cardData from '../../assets/data/eventData/cardData';

const Event = () => {
  const isDesktop = useMediaQuery('(min-width: 450px)');

  return (
    <>
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
