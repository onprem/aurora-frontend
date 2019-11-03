import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './Nav.module.css';

const Nav = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!isNavOpen);
  };
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
    <>
      <button
        className={classNames(styles.burger, { [styles.open]: isNavOpen })}
        onClick={handleNav}
        type="button"
        aria-label="open menu"
      />
      <nav className={classNames(styles.nav, { [styles.open]: isNavOpen })}>
        <ul className={styles.nav_ul}>{navList}</ul>
      </nav>
    </>
  );
};

export default Nav;
