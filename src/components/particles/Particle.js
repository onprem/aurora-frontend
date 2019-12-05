import React from 'react';

import Particles from 'react-particles-js';

import style from './particles.module.css';

import config from '../../assets/configs/particlesjs-config.json';

const Particle = ({ minHeight }) => {
  return <Particles params={config} className={style.canvas_wrapper} />;
};

export default Particle;
