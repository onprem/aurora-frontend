import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import useMediaQuery from '../../utils/useMediaQuery';

import Graveyard from '../../components/graveyard/Graveyard';
import Bat from '../../components/bat/Bat';
import Social from '../../components/Social/Social';
import Particles from '../../components/particles/Particle';

import { ReactComponent as AuroraCircleIcon } from '../../assets/icons/auroraCircle.svg';
import { ReactComponent as AuroraTextIcon } from '../../assets/icons/auroraText.svg';

import styles from './Home.module.css';

const Home = () => {
  const isDesktop = useMediaQuery('(min-width: 450px)');
  const bats = ['Bat1', 'Bat2', 'Bat3', 'Bat4', 'Bat5', 'Bat6', 'Bat7', 'Bat8', 'Bat9'].map(
    style => {
      return <Bat className={styles[style]} speed={Math.random() * 0.4 + 0.6} key={style} />;
    }
  );
  return (
    <>
      <div className={styles.Home}>
        {isDesktop ? (
          <>
            <Parallax y={[-110, 75]}>
              <AuroraCircleIcon className={styles.Logo} />
            </Parallax>
            <Parallax y={[-160, 380]}>
              <AuroraTextIcon className={styles.Text} />
            </Parallax>
          </>
        ) : (
          <>
            <AuroraCircleIcon className={styles.Logo} />
            <AuroraTextIcon className={styles.Text} />
          </>
        )}
        <Graveyard />
        <Particles />
        {bats}
      </div>
      <div className={styles.Footer}>
        <h1 style={{ fontSize: '52px' }}>フッター</h1>
        <div>FOOTER</div>
      </div>
      {isDesktop && <Social />}
    </>
  );
};

export default Home;
