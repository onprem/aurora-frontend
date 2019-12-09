import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

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
    description: 'Pay for Aurora',
    handler: handlePayment,
  };

  const [getOrder, { loading }] = useMutation(GEN_ORDER, {
    onCompleted: oData => {
      launchRzrPay({
        ...options,
        prefill: {
          name: userRes.data.user.name,
          email: userRes.data.user.email,
          contact: userRes.data.user.phone,
        },
        ...oData.generateEventOrder,
      });
    },
    onError: handleErrors,
  });

  if (userRes.loading || verifyRes.loading) return <Loader />;

  const totalMoney = toPay.reduce((accumulator, team) => accumulator + team.event.fee, 0);
  const teamIds = toPay.map(team => team.id);
  return (
    <button
      type="button"
      className={styles.PayBtn}
      onClick={() => getOrder({ variables: { teamIds } })}
    >
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
