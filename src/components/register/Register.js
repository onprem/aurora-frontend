import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';

import useMediaQuery from '../../utils/useMediaQuery';

import { emailValidation } from '../../utils/validation';
import getAlert from '../../utils/getAlert';

import style from './register.module.css';

import REGISTER from '../../graphQl/mutations/register';

const Register = () => {
  const isMobile = useMediaQuery(`(max-width:450px)`);
  const [inputs, changeInputs] = useState({
    name: '',
    phone: '',
    gender: 'male',
    college: '',
    city: '',
    email: '',
    password: '',
  });
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [runRegister, { data, loading, error }] = useMutation(REGISTER);
  const handleSubmit = () => {
    const toast = getAlert();
    if (inputs.email && inputs.password && inputs.city && inputs.college) {
      if (emailValidation(inputs.email)) {
        runRegister({ variables: inputs });
      } else {
        toast.fire({
          icon: 'error',
          title: 'Please enter valid email',
        });
      }
    } else {
      changeInputs({
        gender: inputs.gender,
        phone: inputs.phone,
        name: inputs.name,
        email: inputs.email ? inputs.email : undefined,
        password: inputs.password ? inputs.password : undefined,
        city: inputs.city ? inputs.city : undefined,
        college: inputs.college ? inputs.college : undefined,
      });
      toast.fire({
        icon: 'error',
        title: `College, city, email & password cannot be empty`,
      });
    }
  };
  useEffect(() => {
    if (data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: data.signup.message,
      });
      changeInputs({ email: '', password: '' });
    }
  }, [data]);
  useEffect(() => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  }, [error]);
  useEffect(() => {
    let timeout;
    function handleResize() {
      clearTimeout(timeout);
      if (dimensions)
        timeout = setTimeout(() => {
          setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
          });
        }, 500);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', null);
    };
  }, [dimensions]);
  const [step, changeStep] = useState('1');
  return (
    <div className={style.register_parent}>
      <h1 className={style.register_heading}>REGISTER</h1>

      <svg
        version="1.1"
        viewBox="0 0 906.2 128.2"
        xmlns="http://www.w3.org/2000/svg"
        className={style.register_svg}
      >
        <clipPath id="myClip">
          <path
            transform={
              // eslint-disable-next-line no-nested-ternary
              useMediaQuery(`(max-width:800px)`)
                ? isMobile
                  ? `scale(${(1 * window.innerWidth) / 1920})`
                  : `scale(${(0.7 * window.innerWidth) / 1920})`
                : `scale(${(0.25 * window.innerWidth) / 1920})`
            }
            className={style.register_path}
            d="m56.34 127.8c-19.33-1.982-39.69-15.63-48.74-32.66-5.829-10.97-7.659-18.49-7.604-31.21 0.0421-9.681 0.4714-12.78 2.715-19.58 6.447-19.55 22.58-35.49 42.19-41.7 9.978-3.161 28.02-3.161 38 0 18.56 5.881 34.96 21.44 41.13 39.03l1.842 5.25h654.1l1.703-4.75c4.456-12.43 15.8-26.29 27.08-33.07 25.06-15.07 57.9-11.18 78.16 9.259 12.42 12.53 18.27 25.49 19.21 42.56 0.644 11.73-1.205 21.25-6.081 31.31-8.063 16.63-23.91 29.51-42.1 34.22-7.747 2.006-23.25 2.006-31 0-18.05-4.673-33.98-17.61-42.21-34.25l-3.594-7.272-656.2 0.1364-3.835 7.827c-11.77 24.02-37.19 37.74-64.72 34.91z"
          />
        </clipPath>
      </svg>
      <div className={style.register_steps_parent}>
        <div className={style.register_steps}>
          <div
            className={
              step === '1'
                ? style.register_steps_slider_left
                : ` ${style.register_steps_slider_left} ${style.register_steps_slider_right}`
            }
            style={{
              // eslint-disable-next-line no-nested-ternary
              width: useMediaQuery(`(max-width:800px)`)
                ? isMobile
                  ? `${(window.innerWidth * 125) / 1920}px`
                  : `${(window.innerWidth * 87) / 1920}px`
                : `${(window.innerWidth * 32) / 1920}px`,
            }}
          >
            {step}
          </div>
        </div>
      </div>

      {step === '1' ? (
        <RegisterStep1 changeInputs={changeInputs} inputs={inputs} changeStep={changeStep} />
      ) : (
        <RegisterStep2
          changeInputs={changeInputs}
          inputs={inputs}
          changeStep={changeStep}
          submit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
};
export default Register;
