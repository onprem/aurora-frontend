import React, { useState, useMemo } from 'react';
import classNames from 'classnames';

import styles from './EventTabs.module.css';

const EventTabs = ({ event }) => {
  const [activeTab, setActiveTab] = useState('about');
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
          {rules}
        </div>
        <div
          className={classNames(styles.tabContent, styles.registerTab, {
            [styles.active]: activeTab === 'register',
          })}
        >
          <h2>Registration will open soon.</h2>
        </div>
      </section>
    </div>
  );
};

export default EventTabs;
