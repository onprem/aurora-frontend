import React, { useState } from 'react';
import classNames from 'classnames';

import config from '../../../config';

import styles from './Profile.module.css';
import Modal from '../../Modal/Modal';
import { phoneValidation } from '../../../utils/validation';
import getAlert from '../../../utils/getAlert';

const Profile = ({ className, user }) => {
  const dpBaseURL = config.gcsBucketUrl;

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

  const handleSubmit = e => {
    e.preventDefault();
    const toast = getAlert();
    if (inputs.name && inputs.contact && inputs.city && inputs.college) {
      if (phoneValidation(inputs.contact)) {
        // Trigger edit mutation here
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

  return (
    <>
      <section className={classNames(styles.profileSection, className)}>
        <div className={styles.leftDiv}>
          <div className={styles.photoDiv}>
            <img src={dpBaseURL + user.displayPic} alt="Profile" />
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
            <div>
              <button onClick={() => toggleModal(!isModalOpen)} type="button">
                EDIT
              </button>
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
