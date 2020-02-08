import React, { useState } from 'react';
import ReactQR from 'react-qr-reader';
import { useQuery } from '@apollo/react-hooks';

// import Modal from '../../components/Modal/Modal';
import UserModal from '../../components/AdminDash/UserModal/UserModal';

import USER from '../../graphQl/queries/protected/userDetails';

import styles from './Scan.module.css';

// const UserModal

const User = ({ arId }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading } = useQuery(USER, {
    variables: { arId: arId.toUpperCase() },
    onCompleted: () => {
      setModalOpen(true);
    },
    onError: console.log,
  });

  if (loading || !arId) return <h2>Loading...</h2>;

  return (
    <UserModal
      user={data.userDetails}
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      canEditUsers={false}
    />
  );
};

const Scan = () => {
  const [arId, setArId] = useState(null);

  const handleScan = data => {
    if (data) setArId(data);
  };

  return (
    <div className={styles.scanContainer}>
      {arId ? (
        <User arId={arId} />
      ) : (
        <ReactQR delay={300} onError={console.log} onScan={handleScan} style={{ width: '40%' }} />
      )}
    </div>
  );
};

export default Scan;
