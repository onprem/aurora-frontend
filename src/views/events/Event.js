import React from 'react';

import Card from '../../components/card/Card';
import Carousel from '../../components/Carousel/Carousel';
import Bijli from '../../components/bijli/Bijli';
import Particles from '../../components/particles/Particle';

import cardData from '../../assets/data/eventData/eventdata';

const Event = () => {
  return (
    <>
      <Carousel>
        {cardData.map(event => (
          <Card params={event} />
        ))}
      </Carousel>
      <Bijli />
      <Particles />
    </>
  );
};
export default Event;
