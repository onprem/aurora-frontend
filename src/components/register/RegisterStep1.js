/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { useHistory } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg';

import style from '../login/login.module.css';

import getAlert from '../../utils/getAlert';
import { phoneValidation } from '../../utils/validation';

const RegisterStep1 = ({ changeInputs, inputs, changeStep }) => {
  const history = useHistory();
  const loginClick = e => {
    e.preventDefault();
    history.push('/login');
  };
  const handleInput = event => {
    const { value, name } = event.target;
    changeInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmitClick = e => {
    e.preventDefault();
    const toast = getAlert();
    if (inputs.name && inputs.phone && inputs.gender) {
      if (phoneValidation(inputs.phone)) changeStep('2');
      else {
        toast.fire({
          icon: 'error',
          title: 'Please enter a valid phone number',
        });
      }
    } else {
      changeInputs({
        email: inputs.email,
        password: inputs.password,
        city: inputs.city,
        college: inputs.college,
        gender: inputs.gender ? inputs.gender : undefined,
        phone: inputs.phone ? inputs.phone : undefined,
        name: inputs.name ? inputs.name : undefined,
      });
      toast.fire({
        icon: 'error',
        title: 'Name, phone & gender cannot be empty',
      });
    }
  };
  return (
    <form className={style.login_form} id="register_form_1">
      <label className={style.login_label} htmlFor="name">
        Name
      </label>
      <input
        type="text"
        className={
          inputs.name === undefined
            ? `${style.login_input} ${style.login_input_invalid}`
            : style.login_input
        }
        placeholder=""
        name="name"
        value={inputs.name}
        onChange={handleInput}
        required
      />
      <label className={style.login_label} htmlFor="phone">
        Phone Number
      </label>
      <input
        type="text"
        className={
          // eslint-disable-next-line no-nested-ternary
          inputs.phone
            ? phoneValidation(inputs.phone)
              ? style.login_input
              : `${style.login_input} ${style.login_input_invalid}`
            : inputs.phone === undefined
            ? `${style.login_input} ${style.login_input_invalid}`
            : style.login_input
        }
        placeholder=""
        name="phone"
        value={inputs.phone}
        onChange={handleInput}
        required
      />
      <label className={style.login_label} htmlFor="gender">
        Gender
      </label>
      {/* <input
        type="text"
        className={
          inputs.gender === undefined
            ? `${style.login_input} ${style.login_input_invalid}`
            : style.login_input
        }
        placeholder=""
        name="gender"
        value={inputs.gender}
        onChange={handleInput}
        required
      /> */}
      <select
        name="gender"
        form="register_form_1"
        className={
          inputs.gender === undefined
            ? `${style.login_input} ${style.login_input_invalid}`
            : style.login_input
        }
        id={style.login_select}
        onChange={handleInput}
        value={inputs.gender}
        defaultValue="male"
      >
        <option value="male" selected>
          Male
        </option>
        <option value="female">Female</option>
        <option value="others">Others</option>
      </select>
      <button
        type="submit"
        onClick={onSubmitClick}
        className={style.login_button}
        // disabled={loading}
      >
        Submit
        <Arrow className={style.arrow} />
      </button>
      <hr className={style.login_hr} />
      <h3 className={style.login_not_registered}>Already Registered?</h3>
      <button type="submit" onClick={loginClick} className={style.login_button}>
        Login
        <Arrow className={style.arrow} />
      </button>
    </form>
  );
};
export default RegisterStep1;
