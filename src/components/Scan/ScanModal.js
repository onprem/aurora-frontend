/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import ReactQR from 'react-qr-reader';
import { useQuery } from '@apollo/react-hooks';

import getAlert from '../../utils/getAlert';
import Modal from '../Modal/Modal';
import IssueBand from './IssueBand';
// import UserModal from '../../components/AdminDash/UserModal/UserModal';

import USER from '../../graphQl/queries/protected/userDetails';

import styles from './ScanModal.module.css';

// const UserModal

const User = ({ arId, setIsOpen }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
    setIsOpen(false);
  };

  const { data, loading } = useQuery(USER, {
    variables: { arId: arId.toUpperCase() },
    onError: handleErrors,
    fetchPolicy: 'no-cache',
  });

  if (loading || !arId || !data) return <h2>Loading...</h2>;

  const { user, isBandIssued, bandType, issuedBandType } = data.userDetails;
  console.log(data);

  return (
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
      <h3 className={styles.modalHeadings}>ACTIONS</h3>
      <section className={styles.modalSections}>
        <span>
          <b>BAND TYPE:</b> {bandType}
        </span>
        <span>
          {isBandIssued ? (
            <b>BAND ISSUED: {issuedBandType}</b>
          ) : (
            <>{bandType !== 'none' && <IssueBand arId={user.id} />}</>
          )}
        </span>
      </section>
      <div style={{ padding: '25px', minHeight: '10px', height: '10px' }} />
    </>
  );
};

const ScanModal = ({ isOpen, setIsOpen }) => {
  const [arId, setArId] = useState(null);

  const handleScan = data => {
    if (data) setArId(data);
  };

  const handleOpen = bool => {
    setArId(null);
    setIsOpen(bool);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={handleOpen}>
      {arId ? (
        <User arId={arId} setIsOpen={setIsOpen} />
      ) : (
        <div className={styles.qrDiv}>
          {isOpen && (
            <ReactQR
              delay={300}
              onError={console.log}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ScanModal;
