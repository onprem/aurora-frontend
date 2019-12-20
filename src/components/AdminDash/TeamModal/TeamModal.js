/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Modal from '../../Modal/Modal';

import styles from '../UserModal/UserModal.module.css';

const TeamModal = ({ team, isOpen, setIsOpen }) => {
  const members = team?.members.map(member => {
    return (
      <section className={styles.modalSections} key={member.id}>
        <span>
          <b>AR-ID:</b> {member.id}
        </span>
        <span>
          <b>NAME:</b> {member.name}
        </span>
        <span>
          <b>CITY:</b> {member.city}
        </span>
      </section>
    );
  });
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {team && (
        <>
          <h3 className={styles.modalHeadings}>TEAM DETAILS</h3>
          <section className={styles.modalSections}>
            <span>
              <b>TEAM-ID:</b> {team.id}
            </span>
            <span>
              <b>TEAM NAME:</b> {team.name}
            </span>
            <span>
              <b>PAYMENT:</b> {team.paymentStatus ? 'Paid' : 'Unpaid'}
            </span>
          </section>
          <h3 className={styles.modalHeadings}>MEMBERS</h3>
          {members}
        </>
      )}
    </Modal>
  );
};

export default TeamModal;
