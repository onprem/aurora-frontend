/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import style from './accomodation.module.css';

import Particles from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import Loader from '../../components/Loader/Loader';
import { ReactComponent as Booking } from '../../assets/icons/booking.svg';
import { ReactComponent as LogoDark } from '../../assets/icons/auroraMono.svg';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg';

import getAlert from '../../utils/getAlert';
import { useAuth } from '../../context/auth';
import useMediaQuery from '../../utils/useMediaQuery';
import { ARValidation } from '../../utils/validation';

import USER_QUERY from '../../graphQl/queries/user';
import PUBLIC_USER from '../../graphQl/queries/publicUser';

const RenderUserById = ({ sr, arId, removeUserById, validUser }) => {
  const { loading, error, data } = useQuery(PUBLIC_USER, { variables: { arId } });
  if (data) {
    if (data.publicUser) validUser(true, arId);
    else {
      validUser(false, arId);
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: 'No User exists with given AR-ID',
      });
    }
  }
  if (error && error.graphQLErrors.length > 0) {
    validUser(false, arId);
    const toast = getAlert();
    toast.fire({
      icon: 'error',
      title: error.graphQLErrors[0].message,
    });
  }
  return !loading ? (
    data && data.publicUser ? (
      <div className={style.accomodation_list}>
        <span className={style.accomodation_list_item}>{sr}</span>
        <span className={style.accomodation_list_item}>{data.publicUser.name}</span>
        <span className={style.accomodation_list_item}>{data.publicUser.id}</span>
        <span
          className={style.accomodation_list_item}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <button type="button" className={style.list_button} onClick={() => removeUserById(arId)}>
            REMOVE
            <Cross className={style.accomodation_list_cross} fill="black" />
          </button>
        </span>
      </div>
    ) : null
  ) : (
    <Loader fill="white" />
  );
};

const Accomodation = () => {
  const location = useLocation();
  const history = useHistory();
  const isMobile = useMediaQuery('(max-width:500px)');
  const { authToken } = useAuth();
  const { data, loading } = useQuery(USER_QUERY);
  const [addMemberPay, changeAddMemberPay] = useState(false);
  const [userArray, changeUserArray] = useState([]);
  const [showBooking, changeShowBooking] = useState(false);
  const [input, changeInput] = useState('');

  const bookAccomodationClick = () => {
    if (authToken) {
      if (data && !data.user.accomodation) changeShowBooking(true);
      else {
        const toast = getAlert();
        toast.fire({
          icon: 'error',
          title: 'User already paid for accomodation',
        });
      }
    } else {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: 'Please login to continue',
      });
    }
  };
  const removeUserById = id => {
    if (data.user.id !== id) changeUserArray(userArray.filter(userId => userId !== id));
    else {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: 'User cannot remove itself',
      });
    }
  };
  const onAddMemberClick = e => {
    e.preventDefault();
    if (input !== '' && ARValidation(input)) {
      const arr = userArray;
      arr.push(input);
      changeAddMemberPay(true);
      changeUserArray(arr);
      changeInput('');
    } else {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: 'Please enter a valid AR-ID',
      });
    }
  };
  const validUser = (bool, arId) => {
    if (!bool) {
      changeUserArray(userArray.filter(id => id !== arId));
      changeAddMemberPay(false);
    } else {
      changeAddMemberPay(false);
    }
  };
  useEffect(() => {
    if (data) {
      changeUserArray([data.user.id]);
    }
  }, [data]);

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
        <hr className={style.list_hr} />
        {userArray.map((id, index) => (
          <RenderUserById
            sr={index + 1}
            arId={id}
            removeUserById={removeUserById}
            validUser={validUser}
          />
        ))}
      </div>
      <form className={style.accomodation_form}>
        <input
          value={input}
          onChange={e => changeInput(e.target.value)}
          className={style.accomodation_input}
          placeholder="Enter AR-ID"
        />
        <button
          type="submit"
          className={style.pay_and_add_button}
          onClick={onAddMemberClick}
          disabled={addMemberPay}
        >
          {!addMemberPay ? (
            <>
              ADD MEMBERS
              <Plus className={style.input_plus} />
            </>
          ) : (
            <Loader fill="black" />
          )}
        </button>
      </form>
      <button className={style.pay_and_add_button} type="button" disabled={addMemberPay}>
        {!addMemberPay ? (
          <>
            Pay &#8377;&nbsp;
            {userArray.length * 800}
          </>
        ) : (
          <Loader fill="black" />
        )}
      </button>
    </div>
  );
  console.log(userArray);
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
            authToken ? (
              <button
                type="button"
                onClick={bookAccomodationClick}
                className={style.accomodation_book_button}
                disabled={loading}
              >
                {!loading ? (
                  <>
                    BOOK ACCOMODATION
                    <Booking className={style.booking_button_svg} />
                  </>
                ) : (
                  <Loader fill="black" />
                )}
              </button>
            ) : (
              <button
                type="button"
                className={style.accomodation_book_button}
                onClick={
                  () => history.push({ pathname: '/login', state: { referer: location.pathname } })
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              >
                LOGIN
                <Arrow className={style.arrow} />
              </button>
            )
          ) : (
            RenderShowBooking
          )}
        </div>
      </div>
      <Particles />
      {!isMobile ? <Social fill="black" /> : null}
      <Link to="/">
        <LogoDark className={style.dark_logo} />
      </Link>
    </>
  );
};
export default Accomodation;
