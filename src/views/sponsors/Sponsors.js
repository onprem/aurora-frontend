import React from 'react';

import { Link } from 'react-router-dom';

import style from './sponsors.module.css';

import sponsors from '../../assets/data/eventData/sponsorData';

import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';
import { ReactComponent as LogoDark } from '../../assets/icons/auroraMono.svg';

const SponsorCard = ({ img, name, title }) => {
  return (
    <div className={style.sponsor_card_parent_container}>
      <div className={style.sponsor_img_container}>
        <img className={style.sponsor_card_img} src={img} alt={name} />
      </div>
      <h2 className={style.sponsor_heading}>{name}</h2>
      <span className={style.sponsor_desc}>{title}</span>
    </div>
  );
};

const Sponsors = () => {
  return (
    <>
      <div className={style.sponsor_parent_container}>
        <h1 className={style.sponsor_heading_h1}>PAST SPONSORS</h1>
        <div className={style.sponsor_section}>
          {sponsors.map(sponsor => (
            <SponsorCard
              img={sponsor.img}
              key={sponsor.img}
              name={sponsor.name}
              title={sponsor.title}
            />
          ))}
        </div>
        <Link to="/" className={style.logo}>
          <LogoDark />
        </Link>
      </div>
      <Particles />
      {useMediaQuery(`(max-width:500px)`) ? null : <Social fill="black" />}
    </>
  );
};
export default Sponsors;
