import React from 'react';

import { Link } from 'react-router-dom';

import useMediaQuery from '../../utils/useMediaQuery';

import style from './card.module.css';

const Card = ({ params, index }) => {
  return (
    <>
      <div
        className={style.card_container}
        style={{
          background: `${params.color}`,
        }}
      >
        {/* <img className={style.card_img} src={params.img} alt="Event_art" /> */}
        <div className={style.card_img} style={{ backgroundImage: `url(${params.img})` }} />
        <div className={style.card_desc_container}>
          <h1 className={style.card_heading}>{params.title}</h1>
          <p className={style.card_para}>
            {useMediaQuery('(max-width: 1100px)') ? params.minDesc : params.desc}
          </p>
          <Link
            to={{ pathname: params.path, state: { index } }}
            className={style.card_button}
            style={{ color: `${params.color}` }}
          >
            {useMediaQuery(`(max-width:500px)`) ? 'Register' : 'Register Now'}
            &gt;
          </Link>
        </div>
      </div>
    </>
  );
};
export default Card;
