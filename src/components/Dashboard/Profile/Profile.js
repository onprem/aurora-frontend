import React, { useRef } from 'react';
import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import getAlert from '../../../utils/getAlert';
import useMediaQuery from '../../../utils/useMediaQuery';

import UPLOAD_PHOTO from '../../../graphQl/mutations/uploadPhoto';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as StarIcon } from '../../../assets/icons/caStar.svg';

import config from '../../../config';

import styles from './Profile.module.css';

const Profile = ({ className, user }) => {
  const dpBaseURL = config.gcsBucketUrl;
  const dpRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 450px)');
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
      {isMobile ? (
        <div className={styles.qr_container} style={{ marginBottom: '2em' }}>
          <QRCode value={user.id} size={150} />
        </div>
      ) : (
        <div className={styles.qr_container}>
          <QRCode value={user.id} />
        </div>
      )}

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
          <span>
            {user.name}
            {user.ca.isCA && (
              <Link to="/ca">
                <StarIcon height="0.8em" />
              </Link>
            )}
          </span>
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
            <span>College / Organisation:</span>
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
