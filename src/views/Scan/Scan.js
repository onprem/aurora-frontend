import React, { useState } from 'react';
import ReactQR from 'react-qr-reader';

import styles from './Scan.module.css';

const Scan = () => {
  const [arId, setArId] = useState(null);

  const handleScan = data => {
    if (data) setArId(data);
  };

  return (
    <div className={styles.scanContainer}>
      {arId ? (
        <h1>{arId}</h1>
      ) : (
        <ReactQR delay={300} onError={console.log} onScan={handleScan} style={{ width: '80%' }} />
      )}
    </div>
  );
};

export default Scan;
