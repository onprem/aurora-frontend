/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Modal from '../../Modal/Modal';
import MakeAdmin from '../Actions/MakeAdmin';
import Impersonate from '../Actions/Impersonate';

import styles from './UserModal.module.css';

const UserModal = ({ user, isOpen, setIsOpen, isRoot }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {user && (
        <>
          <h3 className={styles.modalHeadings}>USER DETAILS</h3>
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
          </section>
          <section className={styles.modalSections}>
            <span>
              <b>COLLEGE:</b> {user.college}
            </span>
            <span>
              <b>CITY:</b> {user.city}
            </span>
          </section>
          <h3 className={styles.modalHeadings}>REGISTRATIONS</h3>
          <section className={styles.modalSections}>
            <span>
              <b>ACCOMODATION:</b> {user.accomodation ? 'True' : 'False'}
            </span>
            <span>
              <b>PRONITE:</b> {user.pronite ? 'True' : 'False'}
            </span>
          </section>
          {isRoot && (
            <>
              <h3 className={styles.modalHeadings}>ACTIONS</h3>
              <section className={styles.modalSections}>
                <span>
                  <MakeAdmin arId={user.id} />
                </span>
                <span>
                  <Impersonate arId={user.id} />
                </span>
              </section>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default UserModal;
