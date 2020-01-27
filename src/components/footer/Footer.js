import React from 'react';
import { Link } from 'react-router-dom';

import style from './footer.module.css';

import { ReactComponent as Logo } from '../../assets/icons/auroraCircle.svg';

const sitemap = [
  { title: 'about', path: '/about' },
  { title: 'events', path: '/events' },
  { title: 'pronites', path: '/pronites' },
  { title: 'sponsors', path: '/sponsors' },
  { title: 'contact us', path: '/contact' },
];
const support = [
  { title: 'contact us', path: '/contact' },
  { title: 'find us', path: '/contact' },
];
const social = [
  {
    title: 'waste management',
    path: 'wastemanagement',
  },
];

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
              <Link to={map.path} key={map.title}>
                <li className={style.footer_sitemap_li}>{map.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className={style.footer_divider} />
        <div className={style.footer_support_social_container}>
          <ul className={style.footer_support}>
            <h2 className={style.footer_heading}>Support</h2>
            {support.map(sup => (
              <Link to={sup.path} key={sup.title}>
                <li className={style.footer_support_li}>{sup.title}</li>
              </Link>
            ))}
          </ul>
          <ul className={style.footer_social_cause}>
            <h2 className={style.footer_heading}>Social Cause</h2>
            {social.map(soc => (
              <Link to={soc.path} key={soc.title}>
                <li className={style.footer_social_li}>{soc.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
