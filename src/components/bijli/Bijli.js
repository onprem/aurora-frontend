/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as BijliIcon } from '../../assets/icons/thunder.svg';

import style from './bijli.module.css';

import bijliData from '../../assets/data/eventData/eventdata';

const Bijli = ({ activate }) => {
  const [isBijliOpen, setBijliOpen] = useState(false);

  const toggleBijli = () => {
    setBijliOpen(!isBijliOpen);
  };

  const BijliList = bijliData.map((bijli, index) => (
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
  return (
    <>
      <div className={classNames(style.bijli_container, { [style.open]: isBijliOpen })}>
        <ul className={style.bijli_ul}>{BijliList}</ul>
      </div>
      <button
        className={classNames(style.bijli_button, { [style.open]: isBijliOpen })}
        onClick={toggleBijli}
        type="button"
        aria-label="open menu"
      >
        <BijliIcon />
      </button>
    </>
  );
};
export default Bijli;
