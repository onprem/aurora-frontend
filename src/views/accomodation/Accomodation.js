import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import style from './accomodation.module.css';

import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import { ReactComponent as Booking } from '../../assets/icons/booking.svg';
import { ReactComponent as LogoDark } from '../../assets/icons/auroraMono.svg';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';

const RenderUserById = ({ sr, name, arId, removeUserById }) => {
  return (
    <div className={style.accomodation_list}>
      <span className={style.accomodation_list_item}>{sr}</span>
      <span className={style.accomodation_list_item}>{name}</span>
      <span className={style.accomodation_list_item}>{arId}</span>
      <span className={style.accomodation_list_item}>
        <button type="button" className={style.list_button}>
          onClick=
          {() => removeUserById(arId)}
          REMOVE
          <Cross className={style.accomodation_cross} fill="black" />
        </button>
      </span>
    </div>
  );
};

const Accomodation = () => {
  const [userArray, changeUserArray] = useState([]);
  const [showBooking, changeShowBooking] = useState(false);
  const [input, changeInput] = useState('');
  const bookAccomodationClick = () => {
    changeShowBooking(true);
  };
  const removeUserById = id => {
    changeUserArray(userArray.filter(user => user.id === id));
  };
  const onAddMemberClick = e => {
    e.preventDefault();
  };
  const RenderShowBooking = (
    <div className={style.accomodation_show_parent}>
      <div className={style.divider_container}>
        <hr className={style.accomodation_hr} />
        <Cross className={style.accomodation_cross} fill="white" />
        <hr className={style.accomodation_hr} />
      </div>
      <h3 className={style.accomodation_h3}>TEAM MEMBERS</h3>
      <div className={style.accomodation_list_container}>
        <div className={style.accomodation_list_heading}>
          <span className={style.accomodation_list_heading_item}>#</span>
          <span className={style.accomodation_list_heading_item}>Name</span>
          <span className={style.accomodation_list_heading_item}>AR-ID</span>
          <span className={style.accomodation_list_heading_item}>Action</span>
        </div>
        {userArray.map((user, index) => (
          <RenderUserById
            sr={index + 1}
            name={user.name}
            arId={user.id}
            removeUserById={removeUserById}
          />
        ))}
      </div>
      <form className={style.accomodation_form}>
        <input
          value={input}
          onChange={e => changeInput(e.target.value)}
          className={style.accomodation_input}
        />
        <button type="submit" className={style.pay_and_add_button} onClick={onAddMemberClick}>
          ADD MEMBERS
          <Plus />
        </button>
      </form>
      <button className={style.pay_and_add_button} type="button">
        Pay INR
        {userArray.length * 800}
      </button>
    </div>
  );
  return (
    <>
      <div className={style.accomodation_parent}>
        <div className={style.accomodation_card_container}>
          <h1 className={style.accomodation_h1}>ACCOMODATION</h1>
          <div className={style.accomodation_terms_container}>
            <h3 className={style.accomodation_h3}>Terms & Conditions :</h3>
            <p className={style.accomodation_p}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          {!showBooking ? (
            <button
              type="button"
              onClick={bookAccomodationClick}
              className={style.accomodation_book_button}
            >
              BOOK ACCOMODATION
              <Booking className={style.booking_button_svg} />
            </button>
          ) : (
            RenderShowBooking
          )}
        </div>
      </div>
      <Particles />
      <Social fill="black" />
      <Link to="/">
        <LogoDark className={style.dark_logo} />
      </Link>
    </>
  );
};
export default Accomodation;
