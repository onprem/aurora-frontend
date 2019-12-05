import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';

import RegisterTab from './RegisterTab/RegisterTab';

import styles from './EventTabs.module.css';

const EventTabs = ({ event }) => {
  const [activeTab, setActiveTab] = useState(0);
  const rules = useMemo(() => {
    const getRules = tempRules => {
      let partRules = [];

      tempRules.forEach(rule => {
        if (typeof rule === 'string') partRules.push(<li>{rule}</li>);
        else {
          partRules.push(<li>{rule.headline}</li>);
          const subRules = getRules(rule.rules);
          partRules = partRules.concat(subRules);
        }
      });

      return <ul>{partRules}</ul>;
    };
    return getRules(event.rules);
  }, [event]);

  const evtHeads = event.eventHeads.map(head => <li key={head.name}>{head.name}</li>);

  const evtOrganisers = event.eventOrganisers.map(organiser => (
    <li key={organiser.name}>{organiser.name}</li>
  ));

  useEffect(() => {
    const handleLeft = () => {
      if (activeTab === 0) setActiveTab(2);
      else setActiveTab(activeTab - 1);
    };

    const handleKey = e => {
      if (e.keyCode === 37) handleLeft();
      else if (e.keyCode === 39) setActiveTab((activeTab + 1) % 3);
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeTab]);

  return (
    <div className={styles.tabContainer}>
      <section className={styles.tabHeads}>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 0 })}
          onClick={() => setActiveTab(0)}
        >
          ABOUT
        </button>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 1 })}
          onClick={() => setActiveTab(1)}
        >
          RULES
        </button>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 2 })}
          onClick={() => setActiveTab(2)}
        >
          REGISTER
        </button>
      </section>
      <section className={styles.tabBodys}>
        <div className={classNames(styles.tabContent, { [styles.active]: activeTab === 0 })}>
          <div className={styles.descriptionTab}>
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
          <div>
            <h3>Prizes</h3>
            <p>{event.prizeMoney}</p>
          </div>
          <div className={styles.teamDiv}>
            <div>
              <h3>Event Heads</h3>
              <ol>{evtHeads}</ol>
            </div>
            <div>
              <h3>Event Organisers</h3>
              <ol>{evtOrganisers}</ol>
            </div>
          </div>
        </div>
        <div className={classNames(styles.tabContent, { [styles.active]: activeTab === 1 })}>
          {rules}
        </div>
        <div
          className={classNames(styles.tabContent, styles.registerTab, {
            [styles.active]: activeTab === 2,
          })}
        >
          <RegisterTab eventId={event.id || 1} />
        </div>
      </section>
    </div>
  );
};

export default EventTabs;
