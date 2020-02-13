import React, { useState, useEffect } from 'react';

import { useLocation, Link } from 'react-router-dom';

import classNames from 'classnames';
import schedule from '../../assets/data/scheduleData';
// import Particles from '../../components/particles/Particle';
import styles from './schedule.module.css';
import logoDark from '../../assets/icons/auroraMono.svg';

const ScheduleTabs = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const { day1, day2, day3 } = schedule;

  const day1Schedule = day1.details.map(head => (
    <div className={styles.schedule_header} key={head.event}>
      <div>
        <h4>{head.event}</h4>
      </div>
      <div>
        <h4>{head.time}</h4>
      </div>
      <div>
        <h4>{head.venue}</h4>
      </div>
    </div>
  ));
  const day2Schedule = day2.details.map(head => (
    <div className={styles.schedule_header} key={head.event}>
      <div>
        <h4>{head.event}</h4>
      </div>
      <div>
        <h4>{head.time}</h4>
      </div>
      <div>
        <h4>{head.venue}</h4>
      </div>
    </div>
  ));
  const day3Schedule = day3.details.map(head => (
    <div className={styles.schedule_header} key={head.event}>
      <div>
        <h4>{head.event}</h4>
      </div>
      <div>
        <h4>{head.time}</h4>
      </div>
      <div>
        <h4>{head.venue}</h4>
      </div>
    </div>
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
  useEffect(() => {
    if (location.state && location.state.indexTab) {
      if (location.state.indexTab > 0 && location.state.indexTab < 3)
        setActiveTab(location.state.indexTab);
    }
  }, [location]);

  return (
    <div className={styles.tabContainer}>
      <div style={{ zIndex: 2 }}>
        <Link to="/">
          <img src={logoDark} alt="Aurora logo dark" className={styles.about_logo_dark} />
        </Link>
      </div>

      <h1>Schedule</h1>
      <section className={styles.tabHeads}>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 0 })}
          onClick={() => setActiveTab(0)}
        >
          DAY-1 (14-02-2020)
        </button>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 1 })}
          onClick={() => setActiveTab(1)}
        >
          DAY-2 (15-02-2020)
        </button>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 2 })}
          onClick={() => setActiveTab(2)}
        >
          DAY-3 (16-02-2020)
        </button>
      </section>
      <section className={styles.tabBodys}>
        <div className={classNames(styles.tabContent, { [styles.active]: activeTab === 0 })}>
          <div className={styles.schedule_header}>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Event</h2>
            </div>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Time</h2>
            </div>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Venue</h2>
            </div>
          </div>
          <div>{day1Schedule}</div>
        </div>
        <div className={classNames(styles.tabContent, { [styles.active]: activeTab === 1 })}>
          <div className={styles.schedule_header}>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Event</h2>
            </div>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Time</h2>
            </div>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Venue</h2>
            </div>
          </div>
          <div>{day2Schedule}</div>
        </div>
        <div className={classNames(styles.tabContent, { [styles.active]: activeTab === 2 })}>
          <div className={styles.schedule_header}>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Event</h2>
            </div>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Time</h2>
            </div>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Venue</h2>
            </div>
          </div>
          <div>{day3Schedule}</div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleTabs;
