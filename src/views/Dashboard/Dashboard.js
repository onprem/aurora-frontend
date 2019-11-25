import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Particles from '../../components/particles/Particle';
import Profile from '../../components/Dashboard/Profile/Profile';
import Events from '../../components/Dashboard/Events/Events';
import Invites from '../../components/Dashboard/Invites/Invites';
import Loader from '../../components/Loader/Loader';
import getAlert from '../../utils/getAlert';

import USR_QUERY from '../../graphQl/queries/user';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { data, loading, error } = useQuery(USR_QUERY);
  const history = useHistory();

  useEffect(() => {
    if (error && error.graphQLErrors.length > 0) {
      if (error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
        history.push('/logout');
      } else {
        const toast = getAlert();
        toast.fire({
          icon: 'error',
          title: error.graphQLErrors[0].message,
        });
      }
    }
  }, [error, history]);

  if (loading || error) return <Loader fill="#000000" />;

  return (
    <>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.heading}>DASHBOARD</h1>
        <Profile className={`${styles.sections} ${styles.profileSection}`} user={data.user} />
        <Events className={styles.sections} teams={data.user.teams} />
        <Invites className={styles.sections} teamInvitations={data.user.teamInvitations} />
      </div>
      <Particles minHeight="140vh" />
    </>
  );
};

export default Dashboard;
