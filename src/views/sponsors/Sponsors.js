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
    <div className={style.sponsor_card_parent_container}>
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

const HeadCard = ({ name, phone, email }) => {
  return (
    <div className={style.headCard}>
      <h4 className={style.headHeading}>{name}</h4>
      <a href={`mailto:${email}`}>{email}</a>
      <a href={`tel:${phone}`}>{phone}</a>
    </div>
  );
};

const Sponsors = () => {
  return (
    <>
      <div className={style.sponsor_parent_container}>
        <div className={style.head_section}>
          <h3>Marketing Heads</h3>
          <section className={style.headSection}>
            <HeadCard name="Pankaj Goyal" phone="+91-7404555444" email="pankaj@aurorafest.org" />
            <HeadCard
              name="Prakarsh Pathak"
              phone="+91-8384806031"
              email="prakarsh@aurorafest.org"
            />
          </section>
        </div>
        <h1 className={style.sponsor_heading_h1}>SPONSORS</h1>
        <div className={`${style.sponsor_section} ${style.titleSection}`}>
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
        <div style={{ minHeight: '5em' }} />
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
