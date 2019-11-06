import React from 'react';

import { Link } from 'react-router-dom';

import style from './card.module.css';

const Card = ({ title, desc, img, path, color }) => {
  return (
    <>
      <div className={style.card_container} style={{ background: `${color}` }}>
        <img className={style.card_img} src={img} alt="Event_art" />
        <div className={style.card_desc_container}>
          <h1 className={style.card_heading}>{title}</h1>
          <p className={style.card_para}>{desc}</p>
          <Link to={path} className={style.card_button} style={{ color: `${color}` }}>
            Know More
          </Link>
        </div>
      </div>
    </>
  );
};
export default Card;
