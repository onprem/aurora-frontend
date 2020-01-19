import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../../Button/Button';
import getAlert from '../../../utils/getAlert';
import MAKE_CA from '../../../graphQl/mutations/admin/makeCA';

const MakeCA = ({ arId }) => {
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const [runMakeCA, { loading }] = useMutation(MAKE_CA, {
    onCompleted: oData => {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: oData.makeCA.message,
      });
    },
    onError: handleErrors,
  });

  const handleMakeCA = e => {
    e.preventDefault();

    runMakeCA({ variables: { arId } });
  };

  return <Button onClick={handleMakeCA} text="MAKE CA" isLoading={loading} />;
};

export default MakeCA;
