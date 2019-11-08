import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './EventTabs.module.css';

const EventTabs = ({ event }) => {
  const [activeTab, setActiveTab] = useState('about');
  const rules = event.rules.map(rule => <li>{rule}</li>);

  return (
    <div className={styles.tabContainer}>
      <section className={styles.tabHeads}>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 'about' })}
          onClick={() => setActiveTab('about')}
        >
          ABOUT
        </button>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 'rules' })}
          onClick={() => setActiveTab('rules')}
        >
          RULES
        </button>
        <button
          type="button"
          className={classNames(styles.tabBtn, { [styles.active]: activeTab === 'register' })}
          onClick={() => setActiveTab('register')}
        >
          REGISTER
        </button>
      </section>
      <section className={styles.tabBodys}>
        <div className={classNames(styles.tabContent, { [styles.active]: activeTab === 'about' })}>
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
              <ul>
                <li>Dummy Singh</li>
              </ul>
            </div>
            <div>
              <h3>Event Organisers</h3>
              <ul>
                <li>Dummy Singh</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={classNames(styles.tabContent, { [styles.active]: activeTab === 'rules' })}>
          <ul>{rules}</ul>
        </div>
      </section>
    </div>
  );
};

export default EventTabs;
