import React from 'react';
import Particles from '../../components/particles/Particle';
import Profile from '../../components/Dashboard/Profile/Profile';
import Events from '../../components/Dashboard/Events/Events';
import Invites from '../../components/Dashboard/Invites/Invites';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.heading}>DASHBOARD</h1>
        <Profile className={`${styles.sections} ${styles.profileSection}`} />
        <Events className={styles.sections} />
        <Invites className={styles.sections} />
      </div>
      <Particles />
    </>
  );
};

export default Dashboard;
