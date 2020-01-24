import React, { useState, useEffect } from 'react';

import style from './notificationBar.module.css';

import notificationData from '../../assets/data/eventData/notificationData';

import { ReactComponent as Cross } from '../../assets/icons/cut.svg';

const NotificationBar = () => {
  const [activeNotif, changeActiveNotif] = useState(1);
  const [notif, changeNotif] = useState(true);
  const [transit, changeTransit] = useState(true);
  const handleCloseNotif = () => {
    changeNotif(false);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      changeTransit(false);
      const timeout = setTimeout(() => {
        if (activeNotif === notificationData.length) changeActiveNotif(1);
        else changeActiveNotif(activeNotif + 1);
        changeTransit(true);
        clearTimeout(timeout);
      }, 950);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [activeNotif]);
  return (
    <div className={notif ? style.notification_parent : style.notification_parent_close}>
      <button type="button" className={style.notif_close} onClick={handleCloseNotif}>
        <Cross className={style.cross} />
      </button>
      <h2 className={transit ? style.notif_content : style.notif_content_leave}>
        {notificationData[activeNotif - 1]}
      </h2>
    </div>
  );
};
export default NotificationBar;
