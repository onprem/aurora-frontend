import React from 'react';
import Graveyard from '../../components/graveyard/Graveyard';
import AuroraMonoIcon from '../../assets/icons/AuroraMono';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.Home}>
      <AuroraMonoIcon width="20vh" />
      <Graveyard />
    </div>
  );
};

export default Home;
