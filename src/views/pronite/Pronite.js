import React from 'react';

import { Link } from 'react-router-dom';

import style from './pronite.module.css';

import useMediaQuery from '../../utils/useMediaQuery';

import Particles from '../../components/particles/Particle';

import hero from '../../assets/images/aceaxe$tog.png';

import { ReactComponent as Logo } from '../../assets/icons/auroraMono.svg';
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg';
import Social from '../../components/Social/Social';

const strokeCount = 35;

const ProniteCard = ({ name }) => {
  return (
    <div className={style.pronite_card}>
      <div className={style.pronite_left_container}>
        <div className={style.pronite_stroke_container}>
          {[...Array(strokeCount)].map(e => (
            <div className={style.pronite_vertical} key={e} />
          ))}
        </div>
        <div className={style.pronite_img_container}>
          <img className={style.pronite_img} alt={name} src={hero} />
        </div>
        <div className={style.illusion_1}>
          <div className={style.illusion_1_cover} />
        </div>
        <div className={style.illusion_2}>
          <div className={style.illusion_2_cover} />
        </div>
      </div>
      <div className={style.pronite_right_container}>
        <h1 className={style.pronite_heading}>THE MAGICAL</h1>
        <h2 className={style.pronite_sub_heading}>OLLY ESSE & ACEAXE</h2>
        <p className={style.pronite_p}>
          An electronic dance music Festival held internationally every year all across the globe
          that amalgamates Music and Entertainment and organized by Percept, an Entertainment, Media
          and Communications company of India. EDM Night (Electronic Dance Night) is a set of
          percussive electronic music genres produced primarily for environments centered in
          dance-based entertainment. This year Aurora proudly announces its association with SUNBURN
          and organization of SUNBURN CAMPUS during Aurora 2020 on 14th Feb, 8:30 PM onwards in
          Football Ground at ABV-IITM Gwalior
        </p>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const RenderButtons = () => {
  return (
    <div className={style.button_parent_container}>
      <button className={style.next_prev_button} type="button">
        <Arrow fill="black" className={style.arrow_left} />
      </button>
      <button className={style.next_prev_button} type="button">
        <Arrow fill="black" className={style.arrow_right} />
      </button>
    </div>
  );
};

const Pronite = () => {
  return (
    <>
      <div className={style.pronite_parent}>
        <Link to="/">
          <Logo className={style.logoDark} />
        </Link>
        <ProniteCard />
        {/* <RenderButtons /> */}
      </div>
      <Particles />
      {useMediaQuery(`(max-width:1000px)`) ? null : <Social fill="black" />}
    </>
  );
};

export default Pronite;
