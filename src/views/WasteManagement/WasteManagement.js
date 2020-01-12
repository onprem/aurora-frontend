import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';
import Bat from '../../components/bat/Bat';
import AnimateChealCaowa from '../../utils/chealCaowa';
import Path from '../../components/chealCaowaPath/Path';

import style from './WasteManagement.module.css';

import logoDark from '../../assets/icons/auroraMono.svg';

const WasteManagement = () => {
  const isDesktop = useMediaQuery('(min-width: 450px)');
  useEffect(() => {
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
  }, []);
  return (
    <>
      <div className={style.about_container}>
        <Link to="/">
          <img src={logoDark} alt="Aurora logo dark" className={style.about_logo_dark} />
        </Link>

        <div className={style.about_para_container}>
          <h1 className={style.heading}>AURORA&apos;S SOCIAL CAUSE</h1>
          <p className={style.about_para}>
            For decades, our world has been becoming more convenient. But more convenience has
            brought more waste. Truly investing in sustainability takes more than developing
            advanced trucks or state-of-the-art facilities. At a time where waste management is one
            of the major issues to be tackled, much awareness needs to be spread regarding it and
            much has to be done. Truly investing in sustainability takes more than developing
            advanced trucks or state-of-the-art facilities. Waste management is a social
            responsibility and steps need to be taken at each level, personal or corporate to solve
            this problem. Emphasis has to be laid on the three R. The challenge in waste management
            is multifaceted; ranging from recycling, generation of waste, separation, behavior
            change, collection, transport, treatment, reuse and disposal. It’s a problem that must
            involve all stakeholders at diverse levels; from households, traders, manufacturers,
            private sector companies and governments. Every individual has a role to play to make
            this world a better place. Waste management is a shared and social responsibility and
            steps need to be taken at each level, personal or corporate to solve this problem.
            Emphasis has to be laid on the three R.
            <br />
            <br />
            This year, Aurora’20 has taken up the issue of Waste Management as its Social
            Responsibility. Aurora social responsibility will act as a linkage between the
            institute, the community and the surroundings, to interact, discuss and collaborate on
            various environmental aspects.
          </p>
        </div>
      </div>
      <Particles />
      <Path width="100px" height="100px" />
      <div className="bat_div">
        <Bat className={style.contact_ChealCaowa} id="bat1" key="1" />
        <Bat className={style.contact_ChealCaowa} id="bat2" key="2" />
        <Bat className={style.contact_ChealCaowa} id="bat3" key="3" />
      </div>
      {isDesktop && <Social fill="#000000" />}
    </>
  );
};
export default WasteManagement;
