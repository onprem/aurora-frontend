/* eslint-disable react/jsx-one-expression-per-line */

import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Parallax } from 'react-scroll-parallax';
import useMediaQuery from '../../utils/useMediaQuery';

import Graveyard from '../../components/graveyard/Graveyard';
import Bat from '../../components/bat/Bat';
import Social from '../../components/Social/Social';
import Particles from '../../components/particles/Particle';
import Footer from '../../components/footer/Footer';
import Path from '../../components/chealCaowaPath/Path';
import AnimateChealCaowa from '../../utils/chealCaowa';
import Spider from '../../components/teaserSpider/TeaserSpider';

import { ReactComponent as AuroraCircleIcon } from '../../assets/icons/auroraCircle.svg';
import { ReactComponent as AuroraTextIcon } from '../../assets/icons/auroraText.svg';
import { ReactComponent as Ticket } from '../../assets/icons/ticketHome.svg';
import { ReactComponent as Booking } from '../../assets/icons/booking.svg';
import { ReactComponent as Schedule } from '../../assets/icons/leaveTeam.svg';

import styles from './Home.module.css';

const Home = () => {
  const history = useHistory();
  const isDesktop = useMediaQuery('(min-width: 450px)');
  const bats = ['Bat1', 'Bat2', 'Bat3', 'Bat4', 'Bat5', 'Bat6', 'Bat7', 'Bat8', 'Bat9'].map(
    style => {
      return (
        <Bat
          className={styles.Bats}
          id={styles[style]}
          speed={Math.random() * 0.4 + 0.6}
          key={style}
        />
      );
    }
  );
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isDesktop) {
      const bat1 = document.getElementById('bat1');
      const bat2 = document.getElementById('bat2');
      const bat3 = document.getElementById('bat3');
      const path1 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
        Math.floor(Math.random() * 17)
      ];
      const path2 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
        Math.floor(Math.random() * 17)
      ];
      const path3 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
        Math.floor(Math.random() * 17)
      ];

      const chealCaowa1 = new AnimateChealCaowa(path1, bat1, 200, 0, 0.0003);
      const AnimateChealCaowaFrame1 = requestAnimationFrame(chealCaowa1.moveBat);
      const chealCaowa2 = new AnimateChealCaowa(path2, bat2, 200, 0, 0.0003);
      const AnimateChealCaowaFrame2 = requestAnimationFrame(chealCaowa2.moveBat);
      const chealCaowa3 = new AnimateChealCaowa(path3, bat3, 200, 0, 0.0003);
      const AnimateChealCaowaFrame3 = requestAnimationFrame(chealCaowa3.moveBat);
      return () => {
        window.cancelAnimationFrame(AnimateChealCaowaFrame1);
        window.cancelAnimationFrame(AnimateChealCaowaFrame2);
        window.cancelAnimationFrame(AnimateChealCaowaFrame3);
      };
    }
  }, [isDesktop]);
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
          </>
        ) : (
          <>
            <AuroraCircleIcon className={styles.Logo} />
            <AuroraTextIcon className={styles.Text} />
          </>
        )}

        <div className={styles.homeDate}>
          <span>14-16</span>
          <span>FEB. 2020</span>
        </div>
        <button
          type="button"
          className={styles.ticket_container}
          onClick={() => history.push('/pronites')}
        >
          <h4 className={styles.ticket_heading}>BOOK ALL 3 PRONITES @ &#8377;499</h4>
          <Ticket className={styles.ticket} fill="white" />
        </button>
        <button
          type="button"
          className={`${styles.ticket_container} ${styles.ticket_container_acc}`}
          onClick={() => history.push('/accomodation')}
        >
          <h4 className={styles.ticket_heading}>BOOK ACCOMODATION @ &#8377;799</h4>
          <Booking className={styles.ticket} fill="white" />
        </button>
        <button
          type="button"
          className={`${styles.ticket_container}`}
          onClick={() => history.push('/schedule')}
        >
          <h4 className={styles.ticket_heading}>Schedule for Aurora&apos;20</h4>
          <Schedule className={styles.ticket} fill="white" />
        </button>

        <Graveyard isHauntedHouse />
        <Spider />
        <Particles />
        {bats}
      </div>
      <Footer />
      {isDesktop && <Social />}
      <Particles />
      {isDesktop ? (
        <>
          <Path width="100px" height="100px" />
          <div className="bat_div">
            <Bat className={styles.contact_ChealCaowa} id="bat1" key="1" />
            <Bat className={styles.contact_ChealCaowa} id="bat2" key="2" />
            <Bat className={styles.contact_ChealCaowa} id="bat3" key="3" />
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
