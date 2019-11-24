import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import styles from './Graveyard.module.css';

import hauntedHouse from '../../assets/images/haunted-house.png';
import animationData from '../../assets/lottie/graveyard.json';

const Graveyard = ({ isHauntedHouse }) => {
  useEffect(() => {
    const lottieOptions = {
      container: document.getElementById('grave'),
      loop: false,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMaxYMax slice',
      },
    };
    const graveAnim = lottie.loadAnimation(lottieOptions);

    return () => {
      graveAnim.destroy();
    };
  }, []);

  return (
    <>
      {isHauntedHouse ? (
        <img src={hauntedHouse} alt="Haunted house" className={styles.hauntedHouse} />
      ) : null}
      <div id="grave" className={isHauntedHouse ? styles.footer : styles.footer_wt_haunted} />
    </>
  );
};

export default Graveyard;
