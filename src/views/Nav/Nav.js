import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';

import styles from './Nav.module.css';

const Nav = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 450px)');

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  const pages = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Events',
      path: '/events',
    },
    // {
    //   title: 'Pronites',
    //   path: '/pronites',
    // },
    // {
    //   title: 'Accomodation',
    //   path: '/accomodation',
    // },
    // {
    //   title: 'Login/Register',
    //   path: '/login',
    // },
    // {
    //   title: 'Team',
    //   path: '/team',
    // },
    // {
    //   title: 'Sponsors',
    //   path: '/sponsors',
    // },
    {
      title: 'Contact Us',
      path: '/contact',
    },
  ];

  const navList = pages.map(page => (
    <li className={styles.nav_li} key={page.path}>
      <NavLink to={page.path} onClick={toggleNav}>
        {page.title}
      </NavLink>
    </li>
  ));

  return (
    <>
      <button
        className={classNames(styles.burger, { [styles.open]: isNavOpen })}
        onClick={toggleNav}
        type="button"
        aria-label="open menu"
      />
      <nav className={classNames(styles.nav, { [styles.open]: isNavOpen })}>
        <ul className={styles.nav_ul}>{navList}</ul>
        {isMobile && <Social fill="#000000" />}
      </nav>
    </>
  );
};

export default Nav;
