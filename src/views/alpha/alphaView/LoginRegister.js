import React from 'react';

import Graveyard from '../../../components/graveyard/Graveyard';
import Bat from '../../../components/bat/Bat';
import Particles from '../../../components/particles/Particle';
import Path from '../../../components/chealCaowaPath/Path';

import useMediaQuery from '../../../utils/useMediaQuery';
import Social from '../../../components/Social/Social';
import Register from '../Register';

import style from './loginRegister.module.css';

import thinking from '../../../assets/images/thinking.webp';

const LoginRegister = () => {
  const isDesktop = useMediaQuery('(min-width: 450px)');
  const bats = ['Bat1', 'Bat2', 'Bat3', 'Bat4', 'Bat5', 'Bat6', 'Bat7', 'Bat8', 'Bat9'].map(
    styles => {
      return (
        <Bat
          className={style.Bats}
          id={style[styles]}
          speed={Math.random() * 0.4 + 0.6}
          key={styles}
        />
      );
    }
  );

  return (
    <>
      <div className={style.loginRegister_parent_container}>
        <img src={thinking} className={style.thinking_img_left} alt="thinking" />
        <img src={thinking} className={style.thinking_img_right} alt="thinking" />
        <div
          className={`${style.dummy_loginRegister_card} ${style.dummy_loginRegister_card_register}`}
        >
          <Register />
        </div>
      </div>
      {bats}
      <Graveyard />
      <Particles />
      <Path width="100px" height="100px" />
      <div className="bat_div">
        <Bat className={style.contact_ChealCaowa} id="bat1" key="1" />
        <Bat className={style.contact_ChealCaowa} id="bat2" key="2" />
        <Bat className={style.contact_ChealCaowa} id="bat3" key="3" />
      </div>
      {isDesktop && <Social />}
    </>
  );
};
export default LoginRegister;
