/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';

import style from '../login/login.module.css';

import RESET_PASSWORD from '../../graphQl/mutations/resetPassword';
import getAlert from '../../utils/getAlert';

import Loader from '../Loader/Loader';
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg';

const ResetPassword = () => {
  const history = useHistory();
  const { token } = useParams();
  const [inputs, changeInputs] = useState({ password: '' });
  const [runResetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);
  const handleSubmit = e => {
    e.preventDefault();
    const toast = getAlert();
    if (inputs.password) {
      runResetPassword({ variables: { password: inputs.password, token } });
    } else {
      changeInputs({
        password: inputs.password ? inputs.password : undefined,
      });
      toast.fire({
        icon: 'error',
        title: ' password cannot be empty',
      });
    }
  };
  const handleInput = e => {
    changeInputs({ password: e.target.value });
  };
  useEffect(() => {
    if (data) {
      changeInputs({ password: '' });
      setTimeout(() => {
        history.push('/login');
      }, 4000);
    }
  }, [data, history]);
  useEffect(() => {
    const toast = getAlert();
    if (error && error.graphQLErrors.length > 0) {
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  }, [error]);

  return (
    <form className={style.login_form}>
      {data ? (
        <>
          <p>{data.resetPassword.message}</p>
          <p>Redirecting to login page shortly.</p>
        </>
      ) : (
        <>
          <h1 className={style.login_heading}>Reset Password</h1>
          <label className={style.login_label} htmlFor="password">
            New password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            style={{ marginTop: '-15%' }}
            className={
              inputs.password === undefined
                ? `${style.login_input} ${style.login_input_invalid}`
                : style.login_input
            }
            placeholder=""
            name="password"
            value={inputs.password}
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
export default ResetPassword;
