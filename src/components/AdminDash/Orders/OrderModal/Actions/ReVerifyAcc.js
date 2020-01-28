import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../../../../Button/Button';
import getAlert from '../../../../../utils/getAlert';
import RE_VERIFY_ACC from '../../../../../graphQl/mutations/admin/reVerifyAccOrder';

const ReVerifyAcc = ({ orderId }) => {
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const [runReVerify, { loading }] = useMutation(RE_VERIFY_ACC, {
    onCompleted: oData => {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: oData.reVerifyAccOrder.message,
      });
    },
    onError: handleErrors,
  });

  const handleReVerify = e => {
    e.preventDefault();
    runReVerify({ variables: { orderId } });
  };

  return <Button onClick={handleReVerify} text="RE-VERIFY" isLoading={loading} />;
};

export default ReVerifyAcc;
