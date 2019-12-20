import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../Loader/Loader';
import getAlert from '../../../utils/getAlert';
import Button from '../../Button/Button';
import UserItem from './UserItem';
import UserModal from '../UserModal/UserModal';

import ALL_USRS from '../../../graphQl/queries/protected/allUsers';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';

import styles from './UserTable.module.css';

const UserTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(25);

  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
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

  if (loading && page === 0)
    return (
      <>
        <div className={styles.userDivHeading}>
          <span className={styles.indexSpan}>#</span>
          <span className={styles.nameSpan}>NAME</span>
          <span className={styles.idSpan}>AR-ID</span>
          <span className={styles.emailSpan}>EMAIL</span>
          <span className={styles.citySpan}>CITY</span>
        </div>
        <div className={styles.container} style={{ justifyContent: 'center' }}>
          <Loader fill="#000000" />
        </div>
      </>
    );

  const fireModal = user => {
    setModalUser(user);
    setModalOpen(true);
  };

  const { users, total } = data.allUsers;

  const userItems = users.map((user, index) => {
    return <UserItem key={user.id} user={user} index={index + 1} onClick={() => fireModal(user)} />;
  });

  return (
    <>
      <div className={styles.userDivHeading}>
        <span className={styles.indexSpan}>#</span>
        <span className={styles.nameSpan}>NAME</span>
        <span className={styles.idSpan}>AR-ID</span>
        <span className={styles.emailSpan}>EMAIL</span>
        <span className={styles.citySpan}>CITY</span>
      </div>
      <div className={styles.container}>
        {userItems}
        {users.length < total && (
          <Button
            className={styles.moarBtn}
            onClick={fetchMoreUsers}
            Icon={PlusIcon}
            isLoading={loading}
            text="LOAD MORE"
          />
        )}
      </div>
      <UserModal user={modalUser} isOpen={isModalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default UserTable;
