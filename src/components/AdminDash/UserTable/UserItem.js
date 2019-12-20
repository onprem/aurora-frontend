import React from 'react';

import styles from './UserTable.module.css';

const UserItem = ({ user, index, onClick }) => {
  const handleKeyDown = event => {
    if (event.key === 'Enter') onClick();
  };

  return (
    <div
      className={styles.userDiv}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      <span className={styles.indexSpan}>{index}</span>
      <span className={styles.idSpan}>{user.id}</span>
      <span className={styles.nameSpan}>{user.name}</span>
      <span className={styles.emailSpan}>{user.email}</span>
      <span className={styles.citySpan}>{user.city}</span>
    </div>
  );
};

export default UserItem;
