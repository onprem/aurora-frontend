import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2/src/sweetalert2';

import Button from '../../Button/Button';
import getAlert from '../../../utils/getAlert';
import IMP_USER from '../../../graphQl/mutations/admin/impersonate';

const Impersonate = ({ arId }) => {
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const handleImpersonate = data => {
    Swal.fire({
      title: `Login as ${arId}?`,
      text: `Impersonation Token: ${data.impersonate}`,
      showCancelButton: true,
      confirmButtonColor: 'white',
      cancelButtonColor: 'white',
      cancelButtonText: '<span style="color:black; font-weight:600">CANCEL</span>',
      confirmButtonText: '<span style="color:black; font-weight:600">LOGIN</span>',
    }).then(result => {
      if (result.value) {
        window.localStorage.setItem('token', data.impersonate);
        Swal.fire(`Token saved in localStorage, hard refresh to change session.`);
      }
    });
  };

  const [runImpersonate, { loading }] = useMutation(IMP_USER, {
    onCompleted: handleImpersonate,
    onError: handleErrors,
  });

  return (
    <Button
      onClick={() => runImpersonate({ variables: { arId } })}
      text="IMPERSONATE USER"
      isLoading={loading}
    />
  );
};

export default Impersonate;
