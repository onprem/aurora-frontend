import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Social from '../../components/Social/Social';
import useMediaQuery from '../../utils/useMediaQuery';
import { useAuth } from '../../context/auth';

import styles from './Nav.module.css';

const Nav = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 450px)');
  const isLogRegMobile = useMediaQuery('(max-width: 800px)');
  const { authToken } = useAuth();
  const location = useLocation();

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  const allPages = [
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
    {
      title: 'Accomodation',
      path: '/accomodation',
    },
    {
      title: 'Login/Register',
      path: '/login',
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
    },
    {
      title: 'LogOut',
      path: '/logout',
    },
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
    {
      title: 'FAQs',
      path: '/faq',
    },
  ];

  const pages = authToken
    ? allPages.filter(page => page.path !== '/login' && page.path !== '/register')
    : allPages.filter(page => page.path !== '/dashboard' && page.path !== '/logout');

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
        className={
          // eslint-disable-next-line no-nested-ternary
          location.pathname === '/login' ||
          location.pathname === '/register' ||
          location.pathname === '/forgotPassword'
            ? isLogRegMobile
              ? classNames(styles.burger, { [styles.open]: isNavOpen })
              : classNames(styles.burger, { [styles.open]: isNavOpen }, styles.burger_white)
            : classNames(styles.burger, { [styles.open]: isNavOpen })
        }
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
