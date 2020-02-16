/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2/src/sweetalert2';

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
import useRzrPay from '../../utils/useRzrPay';

import USER_QUERY from '../../graphQl/queries/user';
import PUBLIC_USER from '../../graphQl/queries/publicUser';
import GET_ACC_ORDER from '../../graphQl/mutations/generateAccOrder';
import VERIFY_ACC_ORDER from '../../graphQl/mutations/verifyAccOrder';

const RenderInclusions = () => {
  return (
    <ul>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Pricing: </span>
        <span style={{ textDecoration: 'line-through' }}>&#8377;1800/-</span>
        &nbsp;&nbsp;&#8377; 1599/- per person (Phase-2 pricing)
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Inclusions</span>
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>In-campus 4D/4N accommodation</li>
          <li className={style.accomodation_li}>
            Entry to all Pronites (Yes, you don’t need to buy Pronite Pass separately)
          </li>
          <li className={style.accomodation_li}>Entry to all Proshows</li>
        </ul>
      </li>
    </ul>
  );
};
const RenderTnC = () => {
  return (
    <ul>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Terms & Conditions</span>
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>
            <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Registration Procedure: </span>
            The payment procedure will be online. You can check the following link to register and
            avail accommodation: https://aurorafest.org
          </li>
        </ul>
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Documents Required: </span>
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>Any valid Govt photo ID</li>
          <li className={style.accomodation_li}>Print out of Email confirmation</li>
          <li className={style.accomodation_li}>Gate pass</li>
          <li className={style.accomodation_li}>Valid College ID for participants</li>
        </ul>
        It is mandatory for all guest participants to carry college and government IDs. This is for
        your own convenience. Moreover, you will be asked to produce your ID cards at the time of
        allotment of rooms.
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Accommodation Charges: </span>
        Accommodation charges are INR 799 per candidate.
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>
          It includes accommodation for 4N/4D, entry to all Pronites (3 nights) and Proshows.
        </span>
        <br />
        **Early charges before 13th Feb. 2020, 7:00 PM and late charges after 17th Feb. 2020, 11:00
        AM will be applicable. Accommodation will be provided on a first come first serve basis and
        is subject to availability.
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Check-In and Check-Out Timings:</span>
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>
            Check-In - Anytime after 13th Feb, 2020, 7:00 PM
          </li>
          <li className={style.accomodation_li}>
            Check Out - on or before 17th Feb, 2020,10:00 AM
          </li>
        </ul>
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Kind Of Accommodation: </span>
        Accommodation will be provided on a shared basis inside campus hostels, quarters or
        International Visitors’ Hostel. Girls and boys will be accommodated separately. Mattress,
        Blanket & pillows will be provided. Number of guests in a room and other things will be
        decided and allotted by the Aurora Management team at place.
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Food Facilities: </span>
        Guests can purchase their meals from various food stalls available in and around campus.
        <br />
        **Accommodation charges does not include any meals and can be purchased at your own expenses
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Security Facilities: </span>
        IIITM Gwalior campus has a vigilant and round-the-clock security service. There will be
        additional security to avoid thefts and other mishaps. However, the Institute and the
        management will not be responsible for any theft, loss of belongings and mishaps. Guests are
        advised not to carry any valuable items unless absolutely necessary and will be solely
        responsible for any loss of property.
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>General Rules:</span>
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>
            In case of any discrepancies, decision taken by Aurora Hospitality Team will be final
          </li>
          <li className={style.accomodation_li}>
            You are not allowed to shift beddings to another room
          </li>
          <li className={style.accomodation_li}>
            No requests regarding change of allotted rooms will be entertained
          </li>
          <li className={style.accomodation_li}>
            Participants are expected to abide by the rules and regulations of the Institute
          </li>
          <li className={style.accomodation_li}>
            No kind of drugs, intoxications and weapons are allowed
          </li>
        </ul>
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Code of Conduct: </span>
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>
            If a participant engages in harassing behavior, the organizers may take any action they
            deem appropriate. This includes warning the offender, expulsion from the venue with no
            refund (if applicable), or reporting their behaviour to local law enforcement.
            Harassment includes offensive verbal comments related to gender, gender identity and
            expression, age, sexual orientation, disability, physical appearance, body size, race,
            ethnicity, nationality, religion or political views, sexual images in public spaces,
            deliberate intimidation, stalking, following, photography or audio/video recording
            against reasonable consent, sustained disruption of talks or other events, inappropriate
            physical contact, and unwelcome sexual attention. If you are being harassed, notice that
            someone else is being harassed, or have any other concerns, please contact a member of
            the organizing committee immediately. Organizers will be happy to help participants
            contact any local security or local law enforcement, provide escorts, or otherwise
            assist those experiencing harassment to feel safe for the duration of the festival. We
            value your attendance.
          </li>
        </ul>
      </li>
      <li className={style.accomodation_li}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Query not found?</span>
        <ul className={style.accomodation_ul}>
          <li className={style.accomodation_li}>
            For more information or query, feel free to write at
            <a
              href="mailto:info@aurorafest.org"
              style={{ fontWeight: 600, fontSize: '1.1em', textDecoration: 'underline' }}
            >
              &nbsp;info@aurorafest.org &nbsp;
            </a>
            and we will be happy to assist you.
          </li>
        </ul>
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
        if (!data.user.accommodation) changeShowBooking(true);
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
      title: qData.verifyAccOrder.message,
    });
    changeUserArray([]);
    changeShowBooking(false);
  };

  const [verifyOrder, verifyRes] = useMutation(VERIFY_ACC_ORDER, {
    onCompleted: handleVrfySuccess,
    update: cacheStore => {
      const usrData = cacheStore.readQuery({ query: USER_QUERY });
      usrData.user.accommodation = true;
      cacheStore.writeQuery({
        query: USER_QUERY,
        data: {
          user: { ...usrData.user },
        },
      });
    },
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
    description: 'Payment for Accomodation',
    handler: handlePayment,
  };

  const [getOrder, getOrderRes] = useMutation(GET_ACC_ORDER, {
    onCompleted: oData => {
      launchRzrPay({
        ...options,
        prefill: {
          name: data.user.name,
          email: data.user.email,
          contact: data.user.phone,
        },
        ...oData.generateAccOrder,
      });
    },
    onError: handleErrors,
  });

  const placeOrder = () => {
    if (!addMemberPay) {
      Swal.fire({
        title: 'Are you sure?',
        html: `<ul style="overflow-y: auto; max-height: 40vh">
          <li style="text-align:left; margin-bottom:10px">
            Total payable amount is &#8377;${userArray.length * 1599} + &#8377;${Math.floor(
          userArray.length * 1599 * 2.42
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
        cancelButtonText: '<span style="color:black; font-weight:600">CANCEL</span>',
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
            {userArray.length * 799}
          </>
        )}
      </button>
    </div>
  );

  return (
    <>
      <div className={style.accomodation_parent}>
        <div className={style.accomodation_card_container}>
          <h1 className={style.accomodation_h1}>ACCOMODATION</h1>
          <div className={style.accomodation_terms_container} style={{ width: '96%' }}>
            <RenderInclusions />
          </div>
          {!showBooking ? (
            authToken ? (
              data && data.user.accommodation ? (
                <div className={style.alreadypaid_container}>
                  <h3 className={style.accomodation_h3}>Accomodation Fees Successfully Paid</h3>
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
                      strokeWidth="5px"
                    />
                    <path
                      className={style.checkmark__check}
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      strokeWidth="5px"
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
                      BOOK ACCOMODATION
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
          <div className={style.accomodation_terms_container}>
            <RenderTnC />
          </div>
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
