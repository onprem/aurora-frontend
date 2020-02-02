/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Modal from '../../../Modal/Modal';

import styles from '../../UserModal/UserModal.module.css';

const CAModal = ({ ca, isOpen, setIsOpen }) => {
  const paidUsers = ca?.paidUsers.map(u => {
    return (
      <section className={styles.modalSections} key={u.id}>
        <span>
          <b>AR-ID:</b> {u.id}
        </span>
        <span>
          <b>NAME:</b> {u.name}
        </span>
        <span>
          <b>PHONE:</b>&nbsp;<a href={`tel:${u.phone}`}>{u.phone}</a>
        </span>
        <span>
          <b>CITY:</b> {u.city}
        </span>
        <span>
          <b>COLLEGE:</b> {u.college}
        </span>
      </section>
    );
  });
  const user = ca?.user;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {ca && (
        <>
          <h3 className={styles.modalHeadings}>CA DETAILS</h3>
          <section className={styles.modalSections}>
            <span>
              <b>AR-ID:</b> {user.id}
            </span>
            <span>
              <b>NAME:</b> {user.name}
            </span>
            <span>
              <b>EMAIL:</b> {user.email}
            </span>
            <span>
              <b>MOBILE:</b> {user.phone}
            </span>
          </section>
          <section className={styles.modalSections}>
            <span>
              <b>COLLEGE:</b> {user.college}
            </span>
            <span>
              <b>CITY:</b> {user.city}
            </span>
          </section>
          <h3 className={styles.modalHeadings}>STATS</h3>
          <section className={styles.modalSections}>
            <span>
              <b>TOTAL USERS:</b> {user.ca.users.length}
            </span>
            <span>
              <b>PAID USERS:</b> {ca.paidUsers.length}
            </span>
          </section>
          <h3 className={styles.modalHeadings}>PAID USERS (TOTAL: {ca.paidUsers.length})</h3>
          {paidUsers}
        </>
      )}
    </Modal>
  );
};

export default CAModal;
