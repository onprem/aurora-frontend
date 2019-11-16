import React, { useEffect } from 'react';
import classNames from 'classnames';
import lottie from 'lottie-web';
import styles from './Bat.module.css';

import animationData from '../../assets/lottie/bat.json';

const Bat = ({ className, speed, id }) => {
  useEffect(() => {
    const lottieOptions = {
      container: document.getElementById(id),
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
    const batAnim = lottie.loadAnimation(lottieOptions);
    batAnim.setSpeed(speed);

    return () => {
      batAnim.destroy();
    };
  }, [id, speed]);

  return <div id={id} className={classNames(styles.Bat, className)} />;
};

Bat.defaultProps = {
  speed: 0.8,
};

export default Bat;
