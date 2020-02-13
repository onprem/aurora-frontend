import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import ScanModal from '../../components/Scan/ScanModal';

import styles from './Scan.module.css';

const Scan = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.scanContainer}>
      <ScanModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button onClick={() => setIsOpen(true)} text="SCAN QR" />
    </div>
  );
};

export default Scan;
