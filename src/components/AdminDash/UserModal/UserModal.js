/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Modal from '../../Modal/Modal';
import MakeAdmin from '../Actions/MakeAdmin';
import MakeCA from '../Actions/MakeCA';
import Impersonate from '../Actions/Impersonate';

import styles from './UserModal.module.css';

const UserModal = ({ user, isOpen, setIsOpen, canEditUsers }) => {
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
          <h3 className={styles.modalHeadings}>REGISTRATIONS</h3>
          <section className={styles.modalSections}>
            <span>
              <b>VERIFIED:</b> {user.isVerified ? 'True' : 'False'}
            </span>
            <span>
              <b>ACCOMMODATION:</b> {user.accommodation ? 'True' : 'False'}
            </span>
            <span>
              <b>PRONITE:</b> {user.pronite ? 'True' : 'False'}
            </span>
            <span>
              <b>CA:</b> {user.ca.isCA ? 'True' : 'False'}
            </span>
          </section>
          <h3 className={styles.modalHeadings}>EVENTS</h3>
          {user.teams.map(t => (
            <section className={styles.modalSections} key={t.id}>
              <span>
                <b>TEAM-ID:</b> {t.id}
              </span>
              {t.event.isNameRequired && (
                <span>
                  <b>NAME:</b> {t.name}
                </span>
              )}
              <span>
                <b>EVENT:</b> {t.event.name}
              </span>
              <span>
                <b>STATUS:</b> {t.paymentStatus ? 'Paid' : 'Unpaid'}
              </span>
            </section>
          ))}
          {canEditUsers && (
            <>
              <h3 className={styles.modalHeadings}>ACTIONS</h3>
              <section className={styles.modalSections}>
                <span>
                  <MakeAdmin arId={user.id} />
                </span>
                <span>
                  <MakeCA arId={user.id} />
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
