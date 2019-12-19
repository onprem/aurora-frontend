import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../components/Loader/Loader';
import UserTable from '../../components/AdminDash/UserTable/UserTable';
import getAlert from '../../utils/getAlert';
import ALL_USRS from '../../graphQl/queries/protected/allUsers';

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

  const { data, loading } = useQuery(ALL_USRS, {
    variables: {
      limit: 10,
    },
    onError: handleErrors,
  });

  if (err)
    return (
      <div className={styles.adminDiv}>
        <h1>{err}</h1>
      </div>
    );

  if (loading)
    return (
      <div className={styles.adminDiv}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.adminDiv}>
      <h1>Hey Admin</h1>
      <h1>
        We got&nbsp;
        {data?.allUsers?.total}
        &nbsp;users.
      </h1>
      <UserTable users={data?.allUsers?.users || []} />
    </div>
  );
};

export default AdminDashboard;
