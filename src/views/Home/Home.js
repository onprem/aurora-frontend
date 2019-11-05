import React from 'react';
import Graveyard from '../../components/graveyard/Graveyard';
import { ReactComponent as AuroraMonoIcon } from '../../assets/icons/auroraMono.svg';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.Home}>
      <AuroraMonoIcon width="25vh" />
      <Graveyard />
    </div>
  );
};

export default Home;
