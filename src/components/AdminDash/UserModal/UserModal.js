/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import styles from './UserModal.module.css';

const UserModal = ({ user, isOpen, setIsOpen }) => {
  useEffect(() => {
    const handleKey = event => {
      if (event.key === 'Escape' && isOpen) setIsOpen(false);
    };

    if (isOpen) window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, setIsOpen]);

  if (!user) return null;

  return (
    <div
      className={classNames(styles.container, { [styles.open]: isOpen })}
      onClick={() => setIsOpen(false)}
      role="none"
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="none">
        <section>
          <span>
            <b>AR-ID:</b> {user.id}
          </span>
          <span>
            <b>NAME:</b> {user.name}
          </span>
          <span>
            <b>EMAIL:</b> {user.email}
          </span>
        </section>
        <section>
          <span>
            <b>COLLEGE:</b> {user.college}
          </span>
          <span>
            <b>CITY:</b> {user.city}
          </span>
        </section>
        <section>
          <span>
            <b>ACCOMODATION:</b> {user.accomodation ? 'True' : 'False'}
          </span>
          <span>
            <b>PRONITE:</b> {user.pronite ? 'True' : 'False'}
          </span>
        </section>
      </div>
    </div>
  );
};

export default UserModal;
