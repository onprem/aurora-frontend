import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import styles from './Graveyard.module.css';

import hauntedHouse from '../../assets/images/haunted-house.png';
import animationData from '../../assets/lottie/graveyard.json';

const Graveyard = () => {
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
      <img src={hauntedHouse} alt="Haunted house" className={styles.hauntedHouse} />
      <div id="grave" className={styles.footer} />
    </>
  );
};

export default Graveyard;
