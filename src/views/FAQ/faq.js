import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';
import Bat from '../../components/bat/Bat';
import AnimateChealCaowa from '../../utils/chealCaowa';
import Path from '../../components/chealCaowaPath/Path';

import style from './faq.module.css';

import logoDark from '../../assets/icons/auroraMono.svg';
import FAQData from '../../assets/data/FAQ';

const Faq = () => {
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
        <div className={style.about_logo_container}>
          <h1 className={style.heading}>Frequently asked Questions</h1>
        </div>
        <div className={style.about_para_container}>
          {FAQData.map((FAQ, index) => (
            <>
              <p className={style.about_para}>
                <strong>
                  {FAQ.Section}
                  {FAQ.Section ? <br /> : null}
                  {index + 1}
                  {'. '}
                  {FAQ.Question}
                </strong>
                <br />
              </p>
              <p className={style.answer}>
                {FAQ.Answer.map(answer => {
                  return (
                    <span>
                      {answer}
                      <br />
                    </span>
                  );
                })}
              </p>
            </>
          ))}
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
export default Faq;
