import React from 'react';

import { Link } from 'react-router-dom';

import style from './sponsors.module.css';

import sponsorData from '../../assets/data/sponsorData';

import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';
import { ReactComponent as LogoDark } from '../../assets/icons/auroraMono.svg';

const SponsorCard = ({ img, name, title, url }) => {
  return (
    <div className={`${style.sponsor_card_parent_container} ${style.titleSection}`}>
      <div className={style.sponsor_img_container}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img className={style.sponsor_card_img} src={img} alt={name} />
        </a>
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
        <h1 className={style.sponsor_heading_h1}>SPONSORS</h1>
        <div className={style.sponsor_section}>
          <SponsorCard
            img={sponsorData.titleSponsor.img}
            key={sponsorData.titleSponsor.img}
            name={sponsorData.titleSponsor.name}
            title={sponsorData.titleSponsor.title}
            url={sponsorData.titleSponsor.url}
          />
        </div>
        <div className={style.sponsor_section}>
          {sponsorData.sponsors.map(sponsor => (
            <SponsorCard
              img={sponsor.img}
              key={sponsor.img}
              name={sponsor.name}
              title={sponsor.title}
              url={sponsor.url}
            />
          ))}
        </div>
        <h2 className={style.sponsor_heading_h2}>SOCIAL MEDIA PARTNERS</h2>
        <div className={style.sponsor_section}>
          {sponsorData.socialMedia.map(sponsor => (
            <SponsorCard
              img={sponsor.img}
              key={sponsor.img}
              name={sponsor.name}
              title={sponsor.title}
              url={sponsor.url}
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
