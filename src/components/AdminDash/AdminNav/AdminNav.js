import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './AdminNav.module.css';

const AdminNav = ({ metaData }) => {
  const {
    canViewUsers,
    canViewEvents,
    canViewOrders,
    canViewPronites,
    canViewAcc,
    canViewCA,
  } = metaData;

  return (
    <nav className={styles.adminNav}>
      <NavLink to="/admin">ADMIN</NavLink>
      {canViewUsers && <NavLink to="/admin/users">USERS</NavLink>}
      {canViewEvents && <NavLink to="/admin/events">EVENTS</NavLink>}
      {canViewOrders && <NavLink to="/admin/orders">EVENT-ORDERS</NavLink>}
      {canViewPronites && <NavLink to="/admin/pronites">PRONITES</NavLink>}
      {canViewAcc && <NavLink to="/admin/acc">ACCO-ORDERS</NavLink>}
      {canViewCA && <NavLink to="/admin/ca">CA</NavLink>}
    </nav>
  );
};

export default AdminNav;
