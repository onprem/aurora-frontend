import React from 'react';
import Graveyard from '../../components/graveyard/Graveyard';
import { ReactComponent as AuroraCircleIcon } from '../../assets/icons/auroraCircle.svg';
import { ReactComponent as AuroraTextIcon } from '../../assets/icons/auroraText.svg';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.Home}>
      <AuroraCircleIcon width="25vh" className={styles.Logo} />
      <AuroraTextIcon width="30vh" />
      <Graveyard />
    </div>
  );
};

export default Home;
