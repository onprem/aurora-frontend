import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Swal from 'sweetalert2/src/sweetalert2';

import Loader from '../../../Loader/Loader';
import useRzrPay from '../../../../utils/useRzrPay';
import getAlert from '../../../../utils/getAlert';

import GEN_ORDER from '../../../../graphQl/mutations/generateEventOrder';
import VRFY_ORDER from '../../../../graphQl/mutations/verifyEventOrder';
import USER_QUERY from '../../../../graphQl/queries/user';

import styles from './PayButton.module.css';

const PayButton = ({ toPay, setToPay }) => {
  const handleVrfySuccess = qData => {
    const toast = getAlert();
    toast.fire({
      icon: 'success',
      title: qData.verifyEventOrder.message,
    });
    setToPay([]);
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

  const userRes = useQuery(USER_QUERY, {
    onError: handleErrors,
  });

  const [verifyOrder, verifyRes] = useMutation(VRFY_ORDER, {
    onCompleted: handleVrfySuccess,
    onError: handleErrors,
  });

  const launchRzrPay = useRzrPay();

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
    description: 'Payment for Events',
    handler: handlePayment,
  };

  const [getOrder, { loading }] = useMutation(GEN_ORDER, {
    onCompleted: oData => {
      if (oData.generateEventOrder.order_id === '0') {
        const toast = getAlert();
        toast.fire({
          icon: 'success',
          title: 'Payment successful',
        });
        setToPay([]);
      } else {
        launchRzrPay({
          ...options,
          prefill: {
            name: userRes.data.user.name,
            email: userRes.data.user.email,
            contact: userRes.data.user.phone,
          },
          ...oData.generateEventOrder,
        });
      }
    },
    update: (cacheStore, { data: newData }) => {
      if (newData.generateEventOrder.order_id === '0') {
        const usrData = cacheStore.readQuery({ query: USER_QUERY });

        const newTeams = usrData.user.teams.map(team => {
          if (toPay.some(payTeam => payTeam.id === team.id))
            return {
              ...team,
              paymentStatus: true,
            };
          return team;
        });
        cacheStore.writeQuery({
          query: USER_QUERY,
          data: {
            user: { ...usrData.user, teams: newTeams },
          },
        });
      }
    },
    onError: handleErrors,
  });

  if (userRes.loading || verifyRes.loading) return <Loader />;

  const totalMoney = toPay.reduce((accumulator, team) => accumulator + team.event.fee, 0);
  const teamIds = toPay.map(team => team.id);
  const placeOrder = () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `<ul style="overflow-y: auto; max-height: 40vh">
        <li style="text-align:left; margin-bottom:10px">
          Total payable amount is &#8377;${totalMoney} + &#8377;${Math.floor(totalMoney * 2.42) /
        100} (payment gateway charges)
      </li>
        <li style="text-align:left; margin-bottom:10px">
        Users can be added to the team but cannot be removed or cannot leave the team once the payment for the team is done
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
      if (result.value) {
        getOrder({ variables: { teamIds } });
      }
    });
  };
  return (
    <button type="button" className={styles.PayBtn} onClick={placeOrder} disabled={loading}>
      {loading ? (
        <Loader height="1em" />
      ) : (
        <>
          PAY &#8377;
          {totalMoney}
        </>
      )}
    </button>
  );
};

export default PayButton;
