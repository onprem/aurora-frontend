import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Switch, Route } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import AdminNav from '../../components/AdminDash/AdminNav/AdminNav';
import UserTable from '../../components/AdminDash/UserTable/UserTable';
import TeamTable from '../../components/AdminDash/TeamTable/TeamTable';
import Stats from '../../components/AdminDash/Stats/Stats';
import ProniteTable from '../../components/AdminDash/Orders/ProniteTable';
import EventTable from '../../components/AdminDash/Orders/EventTable';
import AccTable from '../../components/AdminDash/Orders/AccTable';
import CATable from '../../components/AdminDash/CA/CATable';
import getAlert from '../../utils/getAlert';

import ADMIN_META from '../../graphQl/queries/protected/adminMetadata';

import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [err, setErr] = useState(false);

  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      if (error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
        setErr(error.graphQLErrors[0].message);
      } else {
        const toast = getAlert();
        toast.fire({
          icon: 'error',
          title: error.graphQLErrors[0].message,
        });
      }
    }
  };

  const { data, loading } = useQuery(ADMIN_META, {
    onError: handleErrors,
  });

  if (err)
    return (
      <div className={styles.adminDiv}>
        <h1>{err}</h1>
      </div>
    );

  if (loading || !data)
    return (
      <div className={styles.adminDiv} style={{ justifyContent: 'center' }}>
        <Loader fill="#000000" />
      </div>
    );

  const {
    canViewUsers,
    canViewEvents,
    canViewPronites,
    canViewOrders,
    canViewAcc,
    canViewCA,
    events,
  } = data.adminMetadata;

  return (
    <div className={styles.adminDiv}>
      <AdminNav metaData={data.adminMetadata} />
      <h1 className={styles.heading}>ADMIN DASHBOARD</h1>
      <Switch>
        <Route exact path="/admin">
          {canViewUsers && <Stats />}
          {canViewEvents && <TeamTable events={events} />}
          {canViewUsers && <UserTable metaData={data.adminMetadata} />}
        </Route>
        <Route exact path="/admin/users">
          {canViewUsers && <UserTable metaData={data.adminMetadata} />}
        </Route>
        <Route exact path="/admin/events">
          {canViewEvents && <TeamTable events={events} />}
        </Route>
        <Route exact path="/admin/pronites">
          {canViewPronites && <ProniteTable metaData={data.adminMetadata} />}
        </Route>
        <Route exact path="/admin/orders">
          {canViewOrders && <EventTable metaData={data.adminMetadata} />}
        </Route>
        <Route exact path="/admin/acc">
          {canViewAcc && <AccTable metaData={data.adminMetadata} />}
        </Route>
        <Route exact path="/admin/ca">
          {canViewCA && <CATable metaData={data.adminMetadata} />}
        </Route>
      </Switch>
    </div>
  );
};

export default AdminDashboard;
