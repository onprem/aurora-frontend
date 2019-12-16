import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Graveyard from '../../components/graveyard/Graveyard';
import Bat from '../../components/bat/Bat';
import Particles from '../../components/particles/Particle';
import Path from '../../components/chealCaowaPath/Path';
import AnimateChealCaowa from '../../utils/chealCaowa';
import useMediaQuery from '../../utils/useMediaQuery';
import { useAuth } from '../../context/auth';
import Social from '../../components/Social/Social';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
import ForgotPassword from '../../components/forgotPassword/ForgotPassword';

import style from './loginRegister.module.css';

import thinking from '../../assets/images/thinking.webp';
import ResetPassword from '../../components/resetPassword/ResetPassword';

const LoginRegister = () => {
  const { authToken } = useAuth();
  const location = useLocation();

  const referer = location.state && location.state.referer ? location.state.referer : '/dashboard';

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

  useEffect(() => {
    if (!authToken) {
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
    return undefined;
  }, [authToken]);

  if (authToken) return <Redirect to={referer} />;

  return (
    <>
      <div className={style.loginRegister_parent_container}>
        <img src={thinking} className={style.thinking_img_left} alt="thinking" />
        <img src={thinking} className={style.thinking_img_right} alt="thinking" />
        <Switch>
          <Route exact path="/login">
            <div className={style.dummy_loginRegister_card}>
              <Login />
            </div>
          </Route>
          <Route exact path="/register">
            <div
              className={`${style.dummy_loginRegister_card} ${style.dummy_loginRegister_card_register}`}
            >
              <Register />
            </div>
          </Route>
          <Route exact path="/forgotPassword">
            <div className={style.dummy_loginRegister_card}>
              <ForgotPassword />
            </div>
          </Route>
          <Route exact path="/reset/:token">
            <div className={style.dummy_loginRegister_card}>
              <ResetPassword />
            </div>
          </Route>
        </Switch>
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
