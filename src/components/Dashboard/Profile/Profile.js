import React from 'react';
import classNames from 'classnames';

import styles from './Profile.module.css';

const Profile = ({ className }) => {
  const user = {
    id: 'AR-OJ-69',
    name: 'Ojaswa Sharma',
    phone: '9599474147',
    college: 'ABV-IIITM, Gwalior',
    city: 'Gwalior',
    photo: '/assets/profile.jpg',
  };
  return (
    <section className={classNames(styles.profileSection, className)}>
      <div className={styles.leftDiv}>
        <div className={styles.photoDiv}>
          <img src={user.photo} alt="Profile" />
        </div>
        <div className={styles.nameDiv}>
          <span>{user.name}</span>
          <span>{user.id}</span>
        </div>
      </div>
      <div className={styles.rightDiv}>
        <div className={styles.detailsDiv}>
          <div>
            <span>Contact Number:</span>
            <span>College:</span>
            <span>City:</span>
          </div>
          <div>
            <span>{user.phone}</span>
            <span>{user.college}</span>
            <span>{user.city}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
