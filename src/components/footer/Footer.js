import React from 'react';

import style from './footer.module.css';

import { ReactComponent as Logo } from '../../assets/icons/auroraCircle.svg';

const sitemap = ['home', 'about', 'events', 'contact us'];
const support = ['contact us', 'find us'];
const social = ['waste management'];

const Footer = () => {
  return (
    <footer className={style.footer_container}>
      <div className={style.footer_date_logo_container}>
        <Logo className={style.footer_logo} />
        <h2 className={style.date_heading}>14th-16th February</h2>
      </div>
      <div className={style.footer_content_container}>
        <div className={style.footer_content_sitemap}>
          <ul className={style.footer_sitemap}>
            <h2 className={style.footer_heading}>Sitemap</h2>
            {sitemap.map(map => (
              <li className={style.footer_sitemap_li}>{map}</li>
            ))}
          </ul>
        </div>
        <div className={style.footer_divider} />
        <div className={style.footer_support_social_container}>
          <ul className={style.footer_support}>
            <h2 className={style.footer_heading}>Support</h2>
            {support.map(sup => (
              <li className={style.footer_support_li}>{sup}</li>
            ))}
          </ul>
          <ul className={style.footer_social_cause}>
            <h2 className={style.footer_heading}>Social Cause</h2>
            {social.map(soc => (
              <li className={style.footer_social_li}>{soc}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
