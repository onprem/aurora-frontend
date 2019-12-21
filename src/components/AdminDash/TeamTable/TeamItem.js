import React from 'react';

import styles from './TeamTable.module.css';

const TeamItem = ({ team, index, isNameRequired, onClick }) => {
  const handleKeyDown = event => {
    if (event.key === 'Enter') onClick();
  };

  const members = team.members.map(member => member.name).join(', ');

  return (
    <div
      className={styles.teamDiv}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      <span className={styles.indexSpan}>{index}</span>
      <span className={styles.idSpan}>{team.id}</span>
      {isNameRequired && <span className={styles.nameSpan}>{team.name}</span>}
      <span className={styles.usersSpan}>{members}</span>
      <span className={styles.paymentSpan}>{team.paymentStatus ? 'Paid' : 'Unpaid'}</span>
    </div>
  );
};

export default TeamItem;
