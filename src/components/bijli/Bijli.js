/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import useMediaQuery from '../../utils/useMediaQuery';
import BijliIcon from '../../assets/icons/thunder';

import style from './bijli.module.css';

import bijliData from '../../assets/data/eventData/cardData';

const Bijli = ({ activate, onPage }) => {
  const [isBijliOpen, setBijliOpen] = useState(false);
  const location = useLocation();

  const isMobile = useMediaQuery('(max-width: 500px)');

  const toggleBijli = () => {
    setBijliOpen(!isBijliOpen);
  };

  let BijliList;

  if (onPage === 'event') {
    BijliList = bijliData.map((bijli, index) => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <li
        className={style.bijli_li}
        key={bijli.title}
        onClick={() => {
          activate(index + 1);
          toggleBijli();
        }}
      >
        {bijli.title}
      </li>
    ));
  } else {
    BijliList = bijliData.map(bijli => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <Link to={{ pathname: bijli.path, state: location.state }}>
        <li className={style.bijli_li} key={bijli.title}>
          {bijli.title}
        </li>
      </Link>
    ));
  }

  return (
    <>
      <div
        className={classNames(style.bijli_container, { [style.open]: isBijliOpen })}
        onClick={toggleBijli}
      >
        <ul className={style.bijli_ul}>{BijliList}</ul>
      </div>
      <button
        className={classNames(style.bijli_button, { [style.open]: isBijliOpen })}
        onClick={toggleBijli}
        type="button"
        aria-label="open menu"
      >
        <BijliIcon width={isMobile ? '20px' : '30px'} height={isMobile ? '30px' : '40px'} />
      </button>
    </>
  );
};
export default Bijli;
