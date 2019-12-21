import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2/src/sweetalert2';

import Button from '../../Button/Button';
import getAlert from '../../../utils/getAlert';
import MAKE_EVTADMIN from '../../../graphQl/mutations/admin/makeEventAdmin';

const MakeAdmin = ({ arId }) => {
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const [runMakeAdmin, { loading }] = useMutation(MAKE_EVTADMIN, {
    onCompleted: oData => {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: oData.makeEventAdmin.message,
      });
    },
    onError: handleErrors,
  });

  const handleMakeAdmin = e => {
    e.preventDefault();
    Swal.fire({
      title: 'Insert comma seperated eventIds',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: 'white',
      cancelButtonColor: 'white',
      cancelButtonText: '<span style="color:black; font-weight:600">CANCEL</span>',
      confirmButtonText: '<span style="color:black; font-weight:600">SUBMIT</span>',
      // eslint-disable-next-line consistent-return
      inputValidator: value => {
        try {
          JSON.parse(`[${value}]`);
        } catch {
          return 'Invalid eventIds';
        }
      },
    }).then(result => {
      if (result.value) {
        const eventIds = JSON.parse(`[${result.value}]`);
        runMakeAdmin({ variables: { arId, eventIds } });
      }
    });
  };

  return <Button onClick={handleMakeAdmin} text="MAKE EVENT ADMIN" isLoading={loading} />;
};

export default MakeAdmin;
