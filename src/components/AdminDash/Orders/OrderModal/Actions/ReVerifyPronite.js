import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../../../../Button/Button';
import getAlert from '../../../../../utils/getAlert';
import RE_VERIFY_PRONITE from '../../../../../graphQl/mutations/admin/reVerifyProniteOrder';

const ReVerifyPronite = ({ orderId }) => {
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const [runReVerifyPronite, { loading }] = useMutation(RE_VERIFY_PRONITE, {
    onCompleted: oData => {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: oData.reVerifyPronite.message,
      });
    },
    onError: handleErrors,
  });

  const handleReVerifyPronite = e => {
    e.preventDefault();
    runReVerifyPronite({ variables: { orderId } });
  };

  return <Button onClick={handleReVerifyPronite} text="RE-VERIFY" isLoading={loading} />;
};

export default ReVerifyPronite;
