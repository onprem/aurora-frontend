import React, { useState } from 'react';

import UserItem from './UserItem';
import UserModal from '../UserModal/UserModal';

import styles from './UserTable.module.css';

const UserTable = ({ users }) => {
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
      <div className={styles.container}>{userItems}</div>
      <UserModal user={modalUser} isOpen={isModalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default UserTable;
