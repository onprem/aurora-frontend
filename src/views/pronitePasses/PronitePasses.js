/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2/src/sweetalert2';

import style from './pronitePasses.module.css';

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
import useRzrPay from '../../utils/useRzrPay';

import USER_QUERY from '../../graphQl/queries/user';
import PUBLIC_USER from '../../graphQl/queries/publicUser';
import GET_PRO_ORDER from '../../graphQl/mutations/generateProniteOrder';
import VERIFY_PRO_ORDER from '../../graphQl/mutations/verifyProniteOrder';

const RenderTnC = () => {
  return (
    <ul className={style.accomodation_ul}>
      <li className={style.accomodation_li}>
        Accomodation Policies
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>
            Accommodation charges are INR 799 per candidate. It includes accommodation for 4D/4N, 3
            Pronites and Proshows.
          </li>
          <li className={style.accomodation_li}>
            It does not include a food facility. Guest can purchase their meals from the cafeteria,
            night cafeteria or hostel messes at subsidized rates.
          </li>
        </ul>
      </li>
      <li className={style.accomodation_li}>
        Check-In and Check-Out timings
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>
            Check-In - Anytime after 13th Feb. 2020, 7:00 PM
          </li>
          <li className={style.accomodation_li}>
            Check-Out- on or before 17th Feb. 2020, 10:00 AM
          </li>
        </ul>
      </li>
      <li className={style.accomodation_li}>
        Accommodation is provided on a shared basis inside campus hostels or International Visitors’
        Hostel. Girls and boys will be accommodated separately. Number of guests in a room will be
        decided by Aurora and will be allotted by the Aurora Hospitality team.
      </li>
      <li className={style.accomodation_li}>
        Participants must follow all the rules and regulations of the institute.
      </li>
    </ul>
  );
};

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
        <span className={style.accomodation_list_item_sr}>{sr}</span>
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
  const [userArray, changeUserArray] = useState([]);
  const { data, loading } = useQuery(USER_QUERY, {
    onCompleted: uData => {
      changeUserArray([uData.user.id]);
    },
  });
  const [addMemberPay, changeAddMemberPay] = useState(true);

  const [showBooking, changeShowBooking] = useState(false);
  const [input, changeInput] = useState('');

  const bookAccomodationClick = () => {
    if (authToken) {
      if (data) {
        if (!data.user.pronite) changeShowBooking(true);
        else {
          const toast = getAlert();
          toast.fire({
            icon: 'error',
            title: 'User already paid for Pronites',
          });
        }
      } else {
        const toast = getAlert();
        toast.fire({
          icon: 'error',
          title: 'Something went wrong. Please try again later',
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
    } else if (arId === userArray[userArray.length - 1]) {
      changeAddMemberPay(false);
    }
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
  const launchRzrPay = useRzrPay();

  const handleVrfySuccess = qData => {
    const toast = getAlert();
    toast.fire({
      icon: 'success',
      title: qData.verifyProniteOrder.message,
    });
    changeUserArray([]);
    changeShowBooking(false);
  };

  const [verifyOrder, verifyRes] = useMutation(VERIFY_PRO_ORDER, {
    onCompleted: handleVrfySuccess,
    onError: handleErrors,
  });

  const handlePayment = response => {
    // eslint-disable-next-line no-console
    console.log(response);
    verifyOrder({
      variables: {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
      },
    });
  };
  const options = {
    currency: 'INR',
    name: 'Aurora 20',
    description: 'Payment for Pronites',
    handler: handlePayment,
  };

  const [getOrder, getOrderRes] = useMutation(GET_PRO_ORDER, {
    onCompleted: oData => {
      launchRzrPay({
        ...options,
        prefill: {
          name: data.user.name,
          email: data.user.email,
          contact: data.user.phone,
        },
        ...oData.generateProniteOrder,
      });
    },
    update: cacheStore => {
      const usrData = cacheStore.readQuery({ query: USER_QUERY });
      usrData.user.pronite = true;
      cacheStore.writeQuery({
        query: USER_QUERY,
        data: {
          user: { ...usrData.user },
        },
      });
    },
    onError: handleErrors,
  });

  const placeOrder = () => {
    if (!addMemberPay) {
      Swal.fire({
        title: 'Are you sure?',
        html: `<ul>
          <li style="text-align:left; margin-bottom:10px">
            Total payable amount is &#8377;${userArray.length * 349} + &#8377;${Math.floor(
          userArray.length * 349 * 2.42
        ) / 100} (payment gateway charges)
          </li>
          <li style="text-align:left; margin-bottom:10px">
            Payment is non-refundable under any circumstances whatsoever except for extreme cases. Contact our tech support team (<a style="text-decoration:underline" href="mailto:support@aurorafest.org">support@aurorafest.org</a>) for extreme case scenarios.
          </li>
        </ul>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'white',
        cancelButtonColor: 'white',
        cancelButtonText: '<span style="color:black; font-weight:600">Cancel</span>',
        confirmButtonText: '<span style="color:black; font-weight:600">PAY</span>',
      }).then(result => {
        if (result.value) getOrder({ variables: { userIds: userArray } });
      });
    } else {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: 'Something Went wrong please try again later',
      });
    }
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
          <span className={style.accomodation_list_heading_item_sr}>#</span>
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
          disabled={addMemberPay || getOrderRes.loading || verifyRes.loading}
        >
          {addMemberPay || getOrderRes.loading || verifyRes.loading ? (
            <Loader fill="black" />
          ) : (
            <>
              ADD MEMBERS
              <Plus className={style.input_plus} />
            </>
          )}
        </button>
      </form>
      <button
        className={style.pay_and_add_button}
        type="button"
        disabled={addMemberPay || getOrderRes.loading || verifyRes.loading}
        onClick={placeOrder}
      >
        {addMemberPay || getOrderRes.loading || verifyRes.loading ? (
          <Loader fill="black" />
        ) : (
          <>
            Pay &#8377;&nbsp;
            {userArray.length * 349}
          </>
        )}
      </button>
    </div>
  );

  return (
    <>
      <div className={style.accomodation_parent}>
        <div className={style.accomodation_card_container}>
          <h1 className={style.accomodation_h1}>PRONITE PASSES</h1>
          <div className={style.accomodation_terms_container}>
            <h3 className={style.accomodation_h3}>Terms & Conditions :</h3>
            <RenderTnC />
          </div>
          {!showBooking ? (
            authToken ? (
              data && data.user.pronite ? (
                <div className={style.alreadypaid_container}>
                  <h3 className={style.accomodation_h3}>Pronite Fees Successfully Paid</h3>
                  <svg
                    className={style.checkmark1}
                    id="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className={style.checkmark__circle1}
                      id="circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className={style.checkmark__check}
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={bookAccomodationClick}
                  className={style.accomodation_book_button}
                  disabled={loading}
                >
                  {!loading ? (
                    <>
                      BOOK PRONITE
                      <Booking className={style.booking_button_svg} />
                    </>
                  ) : (
                    <Loader fill="black" />
                  )}
                </button>
              )
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
        {!isMobile ? <Social className={style.accomodation_social} fill="black" /> : null}
      </div>
      <Particles />
      <Link to="/">
        <LogoDark className={style.dark_logo} />
      </Link>
    </>
  );
};
export default Accomodation;
