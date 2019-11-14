import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './Alert.module.css';

const Alert = ({ message, type }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeoutID = window.setTimeout(setActive, 300, true);
    return () => window.clearTimeout(timeoutID);
  }, []);

  useEffect(() => {
    const timeoutID = window.setTimeout(setActive, 4300, false);
    return () => window.clearTimeout(timeoutID);
  }, []);

  return (
    <div className={classNames(styles.Alert, styles[type], { [styles.active]: active })}>
      <span className={styles.messageBox}>{message}</span>
      <span className={styles.crossBtn}>&times;</span>
    </div>
  );
};

export default Alert;
