import React, { useEffect } from 'react';
// import classNames from 'classnames';
import lottie from 'lottie-web';
// import styles from './.module.css';

import animationData from '../../assets/lottie/404.json';

const SinkSwim = ({ className, speed, id }) => {
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
    const skelAnim = lottie.loadAnimation(lottieOptions);
    skelAnim.setSpeed(speed);

    return () => {
      skelAnim.destroy();
    };
  }, [id, speed]);

  return <div id={id} className={className} />;
};

SinkSwim.defaultProps = {
  speed: 1,
};

export default SinkSwim;
