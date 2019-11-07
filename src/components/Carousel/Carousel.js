import React from 'react';

// import { DebounceInput } from 'react-debounce-input';

import style from './carousel.module.css';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    const { children } = this.props;
    this.state = {
      active: 1,
      childs: children,
      length: children.length,
      xDown: null,
      yDown: null,
    };
  }

  componentDidMount() {
    const carousel = document.getElementById('carouselTouch');
    carousel.addEventListener('touchstart', this.handleTouchStart);
    carousel.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    const carousel = document.getElementById('carouselTouch');
    carousel.removeEventListener('touchstart', this.handleTouchStart);
    carousel.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('keydown', this.handleKey);
  }

  handleLeftClick = () => {
    this.setState(prevState => {
      if (prevState.active - 1 === 0) return { active: prevState.length };
      return { active: prevState.active - 1 };
    });
  };

  handleRightClick = () => {
    this.setState(prevState => {
      if (prevState.active + 1 === prevState.length + 1) return { active: 1 };
      return { active: prevState.active + 1 };
    });
  };

  classNameResolver = num => {
    const { active } = this.state;
    let className;
    if (num === active + 1) className = `${style.dummy_card} ${style.right}`;
    else if (num >= active + 2) className = `${style.dummy_card} ${style.right_right}`;
    else if (num <= active - 2) className = `${style.dummy_card} ${style.left_left}`;
    else if (num === active - 1) className = `${style.dummy_card} ${style.left}`;
    else if (num === active) className = `${style.dummy_card} ${style.center}`;
    else className = `${style.dummy_card}`;
    return className;
  };

  handleSliderChange = event => {
    const { active } = this.state;
    if (event.target.value > active) this.handleRightClick();
    else if (event.target.value < active) this.handleLeftClick();
  };

  getTouches = evt => {
    return evt.touches;
  };

  handleTouchStart = evt => {
    const firstTouch = this.getTouches(evt)[0];
    this.setState({ xDown: firstTouch.clientX, yDown: firstTouch.clientY });
  };

  handleTouchMove = evt => {
    const { xDown, yDown } = this.state;
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 5) this.handleRightClick();
      else if (xDiff < -5) this.handleLeftClick();
    }

    this.setState({ xDown: null, yDown: null });
  };

  handleKey = e => {
    if (e.keyCode === 37) this.handleLeftClick();
    else if (e.keyCode === 39) this.handleRightClick();
  };

  render() {
    const { childs, length, active } = this.state;
    return (
      <div className={style.carousel_parent_container}>
        <div className={style.carousel_container} id="carouselTouch">
          <div className={style.carousel_card_container}>
            {childs.map((Card, index) => (
              <div className={this.classNameResolver(index + 1)}>{Card}</div>
            ))}
          </div>
        </div>
        <div className={style.slider_container}>
          <input
            type="range"
            min="1"
            max={length}
            value={active}
            className={style.slider}
            id="myRange"
            onChange={this.handleSliderChange}
          />
        </div>
        <div className={style.buttons_container}>
          <button
            className={style.carousel_button_left}
            type="button"
            onClick={this.handleLeftClick}
          >
            &lt;
          </button>
          <button
            className={style.carousel_button_right}
            type="button"
            onClick={this.handleRightClick}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}
export default Carousel;
