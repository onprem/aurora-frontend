import React, { useRef } from 'react';
import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import getAlert from '../../../utils/getAlert';

import UPLOAD_PHOTO from '../../../graphQl/mutations/uploadPhoto';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';

import config from '../../../config';

import styles from './Profile.module.css';

const Profile = ({ className, user }) => {
  const dpBaseURL = config.gcsBucketUrl;
  const dpRef = useRef(null);

  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const [upload, { loading }] = useMutation(UPLOAD_PHOTO, {
    onCompleted: data => {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: data.uploadPhoto.message,
      });
      setTimeout(() => {
        dpRef.current.src = dpBaseURL + data.uploadPhoto.user.displayPic;
      }, 2000);
    },
    onError: handleErrors,
  });

  const handleChange = event => {
    const file = event.target.files[0];
    upload({ variables: { photo: file } });
  };
  const up = () => {
    const chBtn = document.getElementById('chBtn');
    chBtn.click();
  };

  return (
    <section className={classNames(styles.profileSection, className)}>
      <div className={styles.leftDiv}>
        <div className={styles.photoDiv}>
          <img ref={dpRef} src={dpBaseURL + user.displayPic} alt="Profile" />
          <input
            id="chBtn"
            className={styles.changePhotoBtn}
            type="file"
            name="photo"
            onChange={handleChange}
            disabled={loading}
          />
          <button type="button" className={styles.edBtn} onClick={up} disabled={loading}>
            <EditIcon height="2em" />
          </button>
        </div>
        <div className={styles.nameDiv}>
          <span>{user.name}</span>
          <span>
            <b>AR-ID: </b>
            {user.id}
          </span>
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
