import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const index = location.state && location.state.index ? location.state.index : 0;
  const referer = location.state && location.state.referer ? location.state.referer : '/events';

  return (
    <>
      <div className={styles.eventDetail}>
        <ArrowLeftIcon
          className={styles.backArrow}
          onClick={() => history.push({ pathname: referer, state: { index } })}
        />
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

  const [openEvent, setOpenEvent] = useState(0);

  useEffect(() => {
    if (!event.singleEvent && subEventId) {
      const toOpen = Number(subEventId) - 1;
      if (toOpen < event.subEvents.length && toOpen > 0) setOpenEvent(toOpen);
    } else setOpenEvent(0);
  }, [subEventId, event]);

  if (event.singleEvent) {
    return (
      <EventWrapper>
        <EventAccordion event={event} isOpen openHeight="calc(100% - 5px)" />
      </EventWrapper>
    );
  }

  const openHeight = `calc(100% - ${(event.subEvents.length - 1) * 35 + 5}px)`;

  const accordions = event.subEvents.map((subEvent, index) => {
    return (
      <EventAccordion
        event={{
          eventHeads: event.eventHeads,
          eventOrganisers: event.eventOrganisers,
          ...subEvent,
        }}
        isOpen={index === openEvent}
        onClick={() => setOpenEvent(index)}
        path={`/events/${eventId}/${index + 1}`}
        openHeight={openHeight}
        key={subEvent.name}
      />
    );
  });

  return <EventWrapper>{accordions}</EventWrapper>;
};

export default EventDetails;
