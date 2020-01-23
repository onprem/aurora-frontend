import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import getAlert from '../../../utils/getAlert';

import UPLOAD_PHOTO from '../../../graphQl/mutations/uploadPhoto';
import EDIT_PROFILE from '../../../graphQl/mutations/editProfile';

import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { phoneValidation } from '../../../utils/validation';

import config from '../../../config';
import Modal from '../../Modal/Modal';

import styles from './Profile.module.css';

const Profile = ({ className, user }) => {
  const dpBaseURL = config.gcsBucketUrl;
  const dpRef = useRef(null);

  const [isModalOpen, toggleModal] = useState(false);
  const [inputs, changeInputs] = useState({
    name: user.name,
    contact: user.phone,
    college: user.college,
    city: user.city,
  });

  const handleInput = event => {
    const { value, name } = event.target;
    changeInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };
  const [runEditProfile] = useMutation(EDIT_PROFILE, {
    onCompleted: data => {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: data.editProfile.message,
      });
    },
    onError: handleErrors,
  });

  const handleSubmit = e => {
    e.preventDefault();
    const toast = getAlert();
    if (inputs.name && inputs.contact && inputs.city && inputs.college) {
      if (phoneValidation(inputs.contact)) {
        runEditProfile({ variables: inputs });
      } else {
        toast.fire({
          icon: 'error',
          title: 'Please enter valid phone number',
        });
      }
    } else {
      changeInputs({
        name: inputs.name ? inputs.name : undefined,
        contact: inputs.contact ? inputs.contact : undefined,
        college: inputs.college ? inputs.college : undefined,
        city: inputs.city ? inputs.city : undefined,
      });
      toast.fire({
        icon: 'error',
        title: 'Name, phone, college or city cannot be empty',
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
    <>
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
            <span>
              {user.name}
              <span>
                <EditIcon
                  fill="black"
                  className={styles.EditIcon}
                  onClick={() => toggleModal(!isModalOpen)}
                />
              </span>
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
      <Modal isOpen={isModalOpen} setIsOpen={toggleModal}>
        <form className={styles.form}>
          <h3 className={styles.contact_heading}>Edit Details :</h3>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className={
              inputs.name === undefined
                ? `${styles.single_line_input} ${styles.inValid}`
                : `${styles.single_line_input}`
            }
            value={inputs.name}
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Contact Number"
            name="contact"
            className={
              // eslint-disable-next-line no-nested-ternary
              inputs.contact
                ? phoneValidation(inputs.contact)
                  ? `${styles.single_line_input}`
                  : `${styles.single_line_input} ${styles.inValid}`
                : inputs.contact === undefined
                ? `${styles.single_line_input} ${styles.inValid}`
                : `${styles.single_line_input}`
            }
            value={inputs.contact}
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="College"
            name="college"
            className={
              inputs.college === undefined
                ? `${styles.single_line_input} ${styles.inValid}`
                : `${styles.single_line_input}`
            }
            value={inputs.college}
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            className={
              inputs.city === undefined
                ? `${styles.single_line_input} ${styles.inValid}`
                : `${styles.single_line_input}`
            }
            value={inputs.city}
            onChange={handleInput}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.form_submit}
            // disabled={loading}
          >
            SUBMIT
          </button>
        </form>
      </Modal>
    </>
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
