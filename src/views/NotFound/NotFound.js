import React from 'react';
import { Link } from 'react-router-dom';
import SinkSwim from '../../components/SinkSwim/SinkSwim';
import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrowLeft.svg';

import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <div className={styles.notFoundContainer}>
        <div className={styles.dummyAnim}>
          <SinkSwim id="lost" />
        </div>
        <span>NOT ALL WHO WANDER</span>
        <span>ARE LOST!</span>
        <Link to="/" className={styles.goHomeBtn}>
          <ArrowLeftIcon height="1em" />
          RETURN HOME
        </Link>
      </div>
      <Particles />
      <Social fill="#000000" />
    </>
  );
};

export default NotFound;
