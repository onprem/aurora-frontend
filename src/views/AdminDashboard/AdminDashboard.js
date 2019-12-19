import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../components/Loader/Loader';
import UserTable from '../../components/AdminDash/UserTable/UserTable';
import getAlert from '../../utils/getAlert';
import ALL_USRS from '../../graphQl/queries/protected/allUsers';

import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(0);
  const [limit] = useState(5);

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

  const { data, loading, fetchMore } = useQuery(ALL_USRS, {
    variables: {
      limit,
    },
    onError: handleErrors,
    onCompleted: () => setPage(pageN => pageN + 1),
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreUsers = () => {
    fetchMore({
      variables: {
        limit,
        page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          allUsers: {
            ...prev.allUsers,
            users: prev.allUsers.users.concat(fetchMoreResult.allUsers.users),
          },
        };
      },
    });
  };

  if (err)
    return (
      <div className={styles.adminDiv}>
        <h1>{err}</h1>
      </div>
    );

  if (loading && page === 0)
    return (
      <div className={styles.adminDiv}>
        <Loader fill="#000000" />
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
      <UserTable
        users={data?.allUsers?.users || []}
        fetchMoreUsers={fetchMoreUsers}
        total={data?.allUsers?.total}
        loading={loading}
      />
    </div>
  );
};

export default AdminDashboard;
