import React from 'react';
import classNames from 'classnames';

import styles from './Profile.module.css';

const Profile = ({ className, user }) => {
  const dummy = {
    // college: 'Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior',
    college: 'ABV-IIITM',
    city: 'Gwalior',
    photo: `/assets/profile.jpg`,
  };

  return (
    <section className={classNames(styles.profileSection, className)}>
      <div className={styles.leftDiv}>
        <div className={styles.photoDiv}>
          <img src={dummy.photo} alt="Profile" />
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
            <span>{user.phone}</span>
          </div>
          <div>
            <span>College:</span>
            <span>{dummy.college}</span>
          </div>
          <div>
            <span>City:</span>
            <span>{dummy.city}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

Profile.defaultProps = {
  user: {
    id: 'AR-OJ-69',
    name: 'Ojaswa Sharma',
    phone: '9599474147',
    email: 'ojaswa@aurorafest.org',
  },
};

export default Profile;
