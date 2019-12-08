import React from 'react';

import styles from './PayButton.module.css';

const PayButton = ({ toPay }) => {
  const totalMoney = toPay.reduce((accumulator, team) => accumulator + team.event.fee, 0);
  return (
    <button type="button" className={styles.PayBtn}>
      PAY &#8377;
      {totalMoney}
    </button>
  );
};

export default PayButton;
