import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import style from './pronite.module.css';

import useMediaQuery from '../../utils/useMediaQuery';

import Particles from '../../components/particles/Particle';

import proniteData from '../../assets/data/eventData/proniteData';

import { ReactComponent as Logo } from '../../assets/icons/auroraMono.svg';
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg';
import Social from '../../components/Social/Social';

const strokeCount = 35;

const BookButton = () => {
  const history = useHistory();
  return (
    <button
      className={style.button_book_parent}
      type="button"
      onClick={() => history.push('/passes')}
    >
      GET PASSES NOW
    </button>
  );
};

const ProniteCard = ({ title, name, desc, img, className, classNameImage }) => {
  const isMobile = useMediaQuery(`(max-width:500px)`);
  return (
    <div className={className}>
      <div className={style.pronite_left_container}>
        <div className={style.pronite_stroke_container}>
          {[...Array(strokeCount)].map(e => (
            <div className={style.pronite_vertical} key={e} />
          ))}
        </div>
        <div className={classNameImage}>
          <img className={style.pronite_img} alt={name} src={img} />
        </div>
        <div className={style.illusion_1}>
          <div className={style.illusion_1_cover} />
        </div>
        <div className={style.illusion_2}>
          <div className={style.illusion_2_cover} />
        </div>
      </div>
      <div className={style.pronite_right_container}>
        <h1 className={style.pronite_heading}>{title}</h1>
        <h2 className={style.pronite_sub_heading}>{name}</h2>
        {isMobile ? <BookButton /> : null}
        <p className={style.pronite_p}>{desc}</p>
        {!isMobile ? <BookButton /> : null}
      </div>
    </div>
  );
};

const RenderButtons = ({ handleLeftClick, handleRightClick }) => {
  const isMobile = useMediaQuery(`(max-width:500px)`);
  return (
    <div className={style.button_parent_container}>
      <button
        className={
          !isMobile
            ? style.next_prev_button
            : `${style.next_prev_button} ${style.next_prev_button_mob}`
        }
        type="button"
        onClick={handleLeftClick}
      >
        <Arrow fill="black" className={style.arrow_left} />
      </button>
      <button
        className={
          !isMobile
            ? style.next_prev_button
            : `${style.next_prev_button} ${style.next_prev_button_mob}`
        }
        type="button"
        onClick={handleRightClick}
      >
        <Arrow fill="black" className={style.arrow_right} />
      </button>
    </div>
  );
};

const Pronite = () => {
  const [activeCard, changeActiveCard] = useState(1);
  const [isTransit, changeIsTransit] = useState(false);
  let xDown = null;
  let yDown = null;
  const getTouches = evt => {
    return evt.touches;
  };
  const handleLeftClick = () => {
    changeIsTransit(true);
    const timeout = setTimeout(() => {
      changeIsTransit(false);
      if (activeCard === 1) {
        changeActiveCard(proniteData.length);
      } else {
        changeActiveCard(activeCard - 1);
      }
      clearTimeout(timeout);
    }, 950);
  };
  const handleRightClick = () => {
    changeIsTransit(true);
    const timeout = setTimeout(() => {
      changeIsTransit(false);
      if (activeCard === proniteData.length) {
        changeActiveCard(1);
      } else {
        changeActiveCard(activeCard + 1);
      }
      clearTimeout(timeout);
    }, 950);
  };
  const handleTouchStart = evt => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = evt => {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 5) handleRightClick();
      else if (xDiff < -5) handleLeftClick();
    }

    xDown = null;
    yDown = null;
  };
  const handleKey = e => {
    if (e.keyCode === 37) handleLeftClick();
    else if (e.keyCode === 39) handleRightClick();
  };
  useEffect(() => {
    const touch = document.getElementById('touchId');
    touch.addEventListener('touchstart', handleTouchStart);
    touch.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('keydown', handleKey);
    return () => {
      touch.removeEventListener('touchstart', handleTouchStart);
      touch.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKey);
    };
  });
  return (
    <>
      <div className={style.pronite_parent} id="touchId">
        <Link to="/">
          <Logo className={style.logoDark} />
        </Link>

        <ProniteCard
          title={proniteData[activeCard - 1].title}
          name={proniteData[activeCard - 1].name}
          desc={proniteData[activeCard - 1].desc}
          img={proniteData[activeCard - 1].img}
          className={isTransit ? style.pronite_card_out : style.pronite_card}
          classNameImage={isTransit ? style.pronite_img_container_out : style.pronite_img_container}
        />

        <RenderButtons handleLeftClick={handleLeftClick} handleRightClick={handleRightClick} />
      </div>
      <Particles />
      {useMediaQuery(`(max-width:1000px)`) ? null : <Social fill="black" />}
    </>
  );
};

export default Pronite;
