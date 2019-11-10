import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import useMediaQuery from '../../utils/useMediaQuery';

import Graveyard from '../../components/graveyard/Graveyard';
import Bat from '../../components/bat/Bat';
import Social from '../../components/Social/Social';
import Particles from '../../components/particles/Particle';
import Footer from '../../components/footer/Footer';

import { ReactComponent as AuroraCircleIcon } from '../../assets/icons/auroraCircle.svg';
import { ReactComponent as AuroraTextIcon } from '../../assets/icons/auroraText.svg';

import styles from './Home.module.css';

const Home = () => {
  const isDesktop = useMediaQuery('(min-width: 450px)');
  const bats = ['Bat1', 'Bat2', 'Bat3', 'Bat4', 'Bat5', 'Bat6', 'Bat7', 'Bat8', 'Bat9'].map(
    style => {
      return (
        <Bat
          className={`${styles[style]} ${styles.Bats}`}
          speed={Math.random() * 0.4 + 0.6}
          key={style}
        />
      );
    }
  );
  return (
    <>
      <div className={styles.Home}>
        {isDesktop ? (
          <>
            <Parallax y={[-130, 65]} x={[180, -80]}>
              <AuroraCircleIcon className={styles.Logo} />
            </Parallax>
            <Parallax y={[30, 50]} x={[-70, 70]}>
              <AuroraTextIcon className={styles.Text} />
            </Parallax>
            <div className={styles.homeDate}>
              <span>14-16</span>
              <span>FEB. 2020</span>
            </div>
          </>
        ) : (
          <>
            <AuroraCircleIcon className={styles.Logo} />
            <AuroraTextIcon className={styles.Text} />
            <div className={styles.homeDate}>
              <span>14-16</span>
              <span>FEB. 2020</span>
            </div>
          </>
        )}
        <Graveyard />
        <Particles />
        {bats}
      </div>
      <Footer />
      {isDesktop && <Social />}
    </>
  );
};

export default Home;
