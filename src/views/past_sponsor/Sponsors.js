import React from 'react';

const SponsorCard = ({ img, title, designation }) => {
  return (
    <div className={style.sponsor_card_container}>
      <img src={img} className={style.sponsor_image} alt={title} />
      <h3 className={sponsor_title}>{title}</h3>
      <h3 className={sponsor_designation}>{designation}</h3>
    </div>
  );
};

const Sponsors = () => {
  return (
    <div className={style.sponsor_parent_container}>
      <h1 className={style.sponsor_h1}>PAST SPONSORS</h1>
      <div className={style.sponsor_container} />
    </div>
  );
};
export default Sponsors;
