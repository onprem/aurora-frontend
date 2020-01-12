import React from 'react';

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

const ProniteCard = ({ title, name, desc, img }) => {
  return (
    <div className={style.pronite_card}>
      <div className={style.pronite_left_container}>
        <div className={style.pronite_stroke_container}>
          {[...Array(strokeCount)].map(e => (
            <div className={style.pronite_vertical} key={e} />
          ))}
        </div>
        <div className={style.pronite_img_container}>
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

        <p className={style.pronite_p}>{desc}</p>
        <BookButton />
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
        {proniteData.map(nite => (
          <ProniteCard title={nite.title} name={nite.name} desc={nite.desc} img={nite.img} />
        ))}

        {/* <RenderButtons /> */}
      </div>
      <Particles />
      {useMediaQuery(`(max-width:1000px)`) ? null : <Social fill="black" />}
    </>
  );
};

export default Pronite;
