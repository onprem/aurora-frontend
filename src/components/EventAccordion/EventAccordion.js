import React from 'react';
// import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import EventTabs from './EventTabs/EventTabs';

import styles from './EventAccordion.module.css';

const EventAccordion = ({ event, isOpen, onClick, openHeight, path }) => {
  // const history = useHistory();
  const handleClick = () => {
    if (onClick && path) {
      // history.replace(path);
      onClick();
    }
  };
  return (
    <div
      className={classNames(styles.eventAccordion, { [styles.open]: isOpen })}
      style={isOpen ? { height: openHeight } : {}}
    >
      <section className={styles.headSection}>
        <button className={styles.headSectionBtn} onClick={handleClick} type="button">
          {event.name}
        </button>
      </section>
      <section className={styles.bodySection}>
        <EventTabs event={event} />
      </section>
    </div>
  );
};

export default EventAccordion;
