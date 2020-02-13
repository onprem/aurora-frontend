import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../Button/Button';
import getAlert from '../../utils/getAlert';
import ISSUE_BAND from '../../graphQl/mutations/admin/issueBand';

const IssueBand = ({ arId }) => {
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const [runIssueBand, { loading }] = useMutation(ISSUE_BAND, {
    onCompleted: oData => {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: oData.issueBand.message,
      });
    },
    onError: handleErrors,
  });

  const handleIssueBAnd = e => {
    e.preventDefault();

    runIssueBand({ variables: { arId } });
  };

  return <Button onClick={handleIssueBAnd} text="ISSUE BAND" isLoading={loading} />;
};

export default IssueBand;
