import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import eventData from '../../assets/data/eventData/eventData';
import EventAccordion from '../../components/EventAccordion/EventAccordion';
import Particles from '../../components/particles/Particle';

import styles from './EventDetails.module.css';

const EventDetails = () => {
  const { eventId, subEventId } = useParams();
  const event = eventData[eventId.replace(/-/gi, '_')] || eventData.dummy;
  let init = 0;

  if (!event.singleEvent && subEventId) {
    const toOpen = Number(subEventId) - 1;
    if (toOpen < event.subEvents.length && toOpen > 0) init = toOpen;
  }

  const [openEvent, setOpenEvent] = useState(init);

  if (event.singleEvent) {
    return (
      <>
        <div className={styles.eventDetail}>
          <div className={styles.accordionContainer}>
            <EventAccordion event={event} isOpen openHeight="calc(100% - 5px)" />
          </div>
        </div>
        <Particles />
      </>
    );
  }

  const openHeight = `calc(100% - ${(event.subEvents.length - 1) * 45 + 5}px)`;

  const accordions = event.subEvents.map((subEvent, index) => (
    <EventAccordion
      event={subEvent}
      isOpen={index === openEvent}
      onClick={() => setOpenEvent(index)}
      path={`/events/${eventId}/${index + 1}`}
      openHeight={openHeight}
      key={subEvent.name}
    />
  ));

  return (
    <>
      <div className={styles.eventDetail}>
        <div className={styles.accordionContainer}>{accordions}</div>
      </div>
      <Particles />
    </>
  );
};

export default EventDetails;
