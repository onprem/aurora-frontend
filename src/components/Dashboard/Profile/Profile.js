import React from 'react';
import classNames from 'classnames';

import styles from './Profile.module.css';

const Profile = ({ className, user }) => {
  const dpBaseURL = 'https://storage.cloud.google.com/aurora-dp/';

  return (
    <section className={classNames(styles.profileSection, className)}>
      <div className={styles.leftDiv}>
        <div className={styles.photoDiv}>
          <img src={dpBaseURL + user.displayPic} alt="Profile" />
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
            <span>{user.college}</span>
          </div>
          <div>
            <span>City:</span>
            <span>{user.city}</span>
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
