import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import eventData from '../../assets/data/eventData/eventData';
import EventAccordion from '../../components/EventAccordion/EventAccordion';
import Particles from '../../components/particles/Particle';
import Bijli from '../../components/bijli/Bijli';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';

import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrowLeft.svg';

import styles from './EventDetails.module.css';

const EventWrapper = ({ children }) => {
  const isDesktop = useMediaQuery('(min-width: 450px)');
  const history = useHistory();

  return (
    <>
      <div className={styles.eventDetail}>
        <ArrowLeftIcon className={styles.backArrow} onClick={() => history.push('/events')} />
        <div className={styles.accordionContainer}>{children}</div>
      </div>
      <Particles />
      {isDesktop && <Social fill="#000000" />}
      <Bijli onPage="eventDetail" />
    </>
  );
};

const EventDetails = () => {
  const { eventId, subEventId } = useParams();
  const event = eventData[eventId.replace(/-/gi, '_')] || eventData.parivesh;
  let init = 0;

  if (!event.singleEvent && subEventId) {
    const toOpen = Number(subEventId) - 1;
    if (toOpen < event.subEvents.length && toOpen > 0) init = toOpen;
  }

  const [openEvent, setOpenEvent] = useState(init);

  if (event.singleEvent) {
    return (
      <EventWrapper>
        <EventAccordion event={event} isOpen openHeight="calc(100% - 5px)" />
      </EventWrapper>
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

  return <EventWrapper>{accordions}</EventWrapper>;
};

export default EventDetails;
