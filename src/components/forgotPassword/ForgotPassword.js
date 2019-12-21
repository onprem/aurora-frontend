/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';

import style from '../login/login.module.css';

import { emailValidation, ARValidation } from '../../utils/validation';

import FORGOT_PASSWORD from '../../graphQl/mutations/forgotPassword';
import getAlert from '../../utils/getAlert';

import Loader from '../Loader/Loader';
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg';

const ForgotPassword = () => {
  const [inputs, changeInputs] = useState({ email: '' });

  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const [runForgotPassword, { data, loading }] = useMutation(FORGOT_PASSWORD, {
    onError: handleErrors,
    onCompleted: () => {
      changeInputs({ email: '' });
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    const toast = getAlert();
    if (inputs.email) {
      if (emailValidation(inputs.email) || ARValidation(inputs.email)) {
        runForgotPassword({ variables: { arIdOrEmail: inputs.email } });
      } else {
        toast.fire({
          icon: 'error',
          title: 'Please enter valid email',
        });
      }
    } else {
      changeInputs({
        email: inputs.email ? inputs.email : undefined,
      });
      toast.fire({
        icon: 'error',
        title: ' email cannot be empty',
      });
    }
  };

  const handleInput = e => {
    changeInputs({ email: e.target.value });
  };

  return (
    <form className={style.login_form}>
      {data ? (
        <p>{data.forgotPassword.message}</p>
      ) : (
        <>
          <h1 className={style.login_heading}>Forgot Password</h1>
          <label className={style.login_label} htmlFor="email">
            AR-ID / E-mail Address
          </label>
          <input
            type="text"
            style={{ marginTop: '-15%' }}
            className={
              // eslint-disable-next-line no-nested-ternary
              inputs.email
                ? emailValidation(inputs.email) || ARValidation(inputs.email)
                  ? style.login_input
                  : `${style.login_input} ${style.login_input_invalid}`
                : inputs.email === undefined
                ? `${style.login_input} ${style.login_input_invalid}`
                : style.login_input
            }
            placeholder=""
            name="email"
            value={inputs.email}
            onChange={handleInput}
            required
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className={style.login_button}
            disabled={loading}
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                Submit
                <Arrow className={style.arrow} />
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
};
export default ForgotPassword;
