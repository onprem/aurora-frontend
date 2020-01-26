/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import style from '../../components/login/login.module.css';
import eventList from '../../assets/data/eventData/eventList';

import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg';
import { ReactComponent as ArrowBack } from '../../assets/icons/arrow.svg';
import { emailValidation } from '../../utils/validation';

import Loader from '../../components/Loader/Loader';

const RegisterStep2 = ({ changeInputs, inputs, changeStep, submit, loading }) => {
  const handleInput = event => {
    const { value, name } = event.target;
    changeInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onBackClick = e => {
    e.preventDefault();
    changeStep('1');
  };
  const handleSubmit = e => {
    e.preventDefault();
    submit();
  };
  return (
    <form className={style.login_form}>
      <label className={style.login_label} htmlFor="college">
        College&apos;s Name
      </label>
      <input
        type="text"
        className={
          inputs.college === undefined
            ? `${style.login_input} ${style.login_input_invalid}`
            : style.login_input
        }
        placeholder=""
        name="college"
        value={inputs.college}
        onChange={handleInput}
        required
      />
      <label className={style.login_label} htmlFor="city">
        City
      </label>
      <input
        type="text"
        className={
          inputs.city === undefined
            ? `${style.login_input} ${style.login_input_invalid}`
            : style.login_input
        }
        placeholder=""
        name="city"
        value={inputs.city}
        onChange={handleInput}
        required
      />
      <label className={style.login_label} htmlFor="email">
        E-mail Address
      </label>
      <input
        type="email"
        className={
          // eslint-disable-next-line no-nested-ternary
          inputs.email
            ? emailValidation(inputs.email)
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

      <label className={style.login_label} htmlFor="event">
        Event
      </label>
      <select
        className={
          inputs.event === undefined
            ? `${style.evtSelect} ${style.login_input_invalid}`
            : style.evtSelect
        }
        name="event"
        onChange={handleInput}
        value={inputs.event}
      >
        <option key="none" value="0">
          None
        </option>
        {eventList.map(evt => {
          return (
            <option key={evt.id} value={evt.id}>
              {evt.name}
            </option>
          );
        })}
      </select>
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
            Register
            <Arrow className={style.arrow} />
          </>
        )}
      </button>
      <button type="submit" className={style.login_button_back} onClick={onBackClick}>
        <ArrowBack className={style.arrow_back} />
      </button>
    </form>
  );
};
export default RegisterStep2;
