import React, { useState } from 'react';

import UserItem from './UserItem';
import UserModal from '../UserModal/UserModal';
import Button from '../../Button/Button';

import { ReactComponent as CheckIcon } from '../../../assets/icons/checkmark.svg';

import styles from './UserTable.module.css';

const UserTable = ({ users, fetchMoreUsers, total, loading }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);

  const fireModal = user => {
    setModalUser(user);
    setModalOpen(true);
  };

  const userItems = users.map(user => {
    return <UserItem key={user.id} user={user} onClick={() => fireModal(user)} />;
  });

  return (
    <>
      <div className={styles.container}>
        {userItems}
        {users.length < total && (
          <Button
            className={styles.moarBtn}
            onClick={fetchMoreUsers}
            Icon={CheckIcon}
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
