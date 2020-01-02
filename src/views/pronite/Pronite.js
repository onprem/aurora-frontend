import React from 'react';

import style from './pronite.module.css';

import Particles from '../../components/particles/Particle';

import hero from '../../assets/images/IO.jpg';

const strokeCount = 35;

const ProniteCard = ({ name }) => {
  return (
    <div className={style.pronite_card}>
      <div className={style.pronite_left_container}>
        <div className={style.pronite_stroke_container}>
          {[...Array(strokeCount)].map((e, i) => (
            <div className={style.pronite_vertical} key={i} />
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
        <h1 className={style.pronite_heading}>THE SUBLIME</h1>
        <h2 className={style.pronite_sub_heading}>RITVIZ</h2>
        <p className={style.pronite_p}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>
      </div>
    </div>
  );
};

const Pronite = () => {
  return (
    <>
      <div className={style.pronite_parent}>
        <ProniteCard />
      </div>
      <Particles />
    </>
  );
};

export default Pronite;
