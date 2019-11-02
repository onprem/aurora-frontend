import React from 'react';

import styles from './Nav.module.css';

const Nav = () => {
  const pages = [
    'Home',
    'About',
    'Events',
    'Pronites',
    'Accomodation',
    'Login/Register',
    'Team',
    'Sponsors',
    'Contact Us',
  ];

  const navList = pages.map(page => <li className={styles.nav_li}>{page}</li>);

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_ul}>{navList}</ul>
    </nav>
  );
};

export default Nav;
