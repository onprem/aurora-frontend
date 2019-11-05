import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import Graveyard from '../../components/graveyard/Graveyard';
import useMediaQuery from '../../utils/useMediaQuery';
import { ReactComponent as AuroraCircleIcon } from '../../assets/icons/auroraCircle.svg';
import { ReactComponent as AuroraTextIcon } from '../../assets/icons/auroraText.svg';
import styles from './Home.module.css';

const Home = () => {
  const isMobile = useMediaQuery('(min-width: 450px)');
  return (
    <>
      <div className={styles.Home}>
        {isMobile ? (
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
      </div>
      <div className={styles.Footer}>
        <div>AA</div>
      </div>
    </>
  );
};

export default Home;
