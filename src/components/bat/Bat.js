import React, { useEffect } from 'react';
import classNames from 'classnames';
import lottie from 'lottie-web';
import styles from './Bat.module.css';

import animationData from '../../assets/lottie/bat.json';

const Bat = ({ className, speed }) => {
  useEffect(() => {
    const lottieOptions = {
      container: document.getElementsByClassName(className)[0],
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
  }, [className, speed]);

  return <div id="bat" className={classNames(styles.Bat, className)} />;
};

Bat.defaultProps = {
  speed: 0.8,
};

export default Bat;
