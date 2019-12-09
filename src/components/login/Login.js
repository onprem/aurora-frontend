/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import getAlert from '../../utils/getAlert';
import { useAuth } from '../../context/auth';
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg';
import Loader from '../Loader/Loader';
import { emailValidation, ARValidation } from '../../utils/validation';

import style from './login.module.css';

import LOGIN from '../../graphQl/mutations/login';

const Login = () => {
  const { setAuthToken } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const [inputs, changeInputs] = useState({ email: '', password: '' });
  const [runLogin, { data, loading, error }] = useMutation(LOGIN);

  const handleInput = event => {
    const { value, name } = event.target;
    changeInputs({
      ...inputs,
      [name]: value,
    });
  };

  const registerClick = e => {
    e.preventDefault();
    history.push('/register');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const toast = getAlert();
    if (inputs.email && inputs.password) {
      if (emailValidation(inputs.email) || ARValidation(inputs.email)) {
        runLogin({ variables: inputs });
      } else {
        toast.fire({
          icon: 'error',
          title: 'Please enter valid email',
        });
      }
    } else {
      changeInputs({
        email: inputs.email ? inputs.email : undefined,
        password: inputs.password ? inputs.password : undefined,
      });
      toast.fire({
        icon: 'error',
        title: ' email or password cannot be empty',
      });
    }
  };

  useEffect(() => {
    if (data) {
      const referer =
        location.state && location.state.referer ? location.state.referer : '/dashboard';
      changeInputs({ email: '', password: '' });
      setAuthToken(data.login);
      history.push({ pathname: referer, state: location.state });
    }
  }, [data, history, location, setAuthToken]);

  useEffect(() => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  }, [error]);

  return (
    <form className={style.login_form}>
      <h1 className={style.login_heading}>LOGIN</h1>
      <label className={style.login_label} htmlFor="email">
        AR-ID / E-mail Address
      </label>
      <input
        type="text"
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
      <label className={style.login_label} htmlFor="password">
        Password
      </label>
      <input
        type="password"
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
            Login
            <Arrow className={style.arrow} />
          </>
        )}
      </button>
      <Link to="/forgotPassword" className={style.login_link}>
        Forgot Password?
      </Link>
      <hr className={style.login_hr} />
      <h3 className={style.login_not_registered}>Not yet Registered?</h3>
      <button type="submit" onClick={registerClick} className={style.login_button}>
        Register
        <Arrow className={style.arrow} />
      </button>
    </form>
  );
};
export default Login;
