import React, { useState, useEffect } from 'react';

import Bijli from '../bijli/Bijli';
// import { DebounceInput } from 'react-debounce-input';

import style from './carousel.module.css';

const Carousel = ({ children }) => {
  const [active, setActive] = useState(1);
  let xDown = null;
  let yDown = null;

  const toggleActive = num => {
    setActive(num);
  };

  const handleLeftClick = () => {
    if (active - 1 === 0) setActive(children.length);
    else setActive(active - 1);
  };

  const handleRightClick = () => {
    if (active + 1 === children.length + 1) setActive(1);
    else setActive(active + 1);
  };

  const classNameResolver = num => {
    let className;
    if (num === active + 1) className = `${style.dummy_card} ${style.right}`;
    else if (num >= active + 2) className = `${style.dummy_card} ${style.right_right}`;
    else if (num <= active - 2) className = `${style.dummy_card} ${style.left_left}`;
    else if (num === active - 1) className = `${style.dummy_card} ${style.left}`;
    else if (num === active) className = `${style.dummy_card} ${style.center}`;
    else className = `${style.dummy_card}`;
    return className;
  };

  const handleSliderChange = event => {
    if (event.target.value > active) handleRightClick();
    else if (event.target.value < active) handleLeftClick();
  };

  const getTouches = evt => {
    return evt.touches;
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
    const carousel = document.getElementById('carouselTouch');
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('keydown', handleKey);
    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKey);
    };
  });

  return (
    <div className={style.carousel_parent_container}>
      <div className={style.carousel_container} id="carouselTouch">
        <div className={style.carousel_card_container}>
          {children.map((Card, index) => (
            <div className={classNameResolver(index + 1)}>{Card}</div>
          ))}
        </div>
      </div>
      <div className={style.slider_container}>
        <input
          type="range"
          min="1"
          max={children.length}
          value={active}
          className={style.slider}
          id="myRange"
          onChange={handleSliderChange}
        />
      </div>
      <div className={style.buttons_container}>
        <button className={style.carousel_button_left} type="button" onClick={handleLeftClick}>
          &lt;
        </button>
        <button className={style.carousel_button_right} type="button" onClick={handleRightClick}>
          &gt;
        </button>
      </div>
      <Bijli activate={toggleActive} />
    </div>
  );
};
export default Carousel;
