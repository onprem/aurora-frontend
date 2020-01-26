import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Loader from '../../../Loader/Loader';
import getAlert from '../../../../utils/getAlert';

import LEAVE_TEAM from '../../../../graphQl/mutations/leaveTeam';
import USER_QUERY from '../../../../graphQl/queries/user';

import styles from '../PayButton/PayButton.module.css';

const LeaveBtn = ({ teamId, setToPay }) => {
  const handleSuccess = qData => {
    const toast = getAlert();
    toast.fire({
      icon: 'success',
      title: qData.leaveTeam.message,
    });
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

  const [leaveTeam, { loading }] = useMutation(LEAVE_TEAM, {
    onCompleted: handleSuccess,
    onError: handleErrors,
    update: cacheStore => {
      const userData = cacheStore.readQuery({ query: USER_QUERY });
      const newTeams = userData.user.teams.filter(team => team.id !== teamId);
      cacheStore.writeQuery({
        query: USER_QUERY,
        data: {
          user: {
            ...userData.user,
            teams: newTeams,
          },
        },
      });
    },
  });

  return (
    <button
      type="button"
      className={styles.PayBtn}
      onClick={() => {
        leaveTeam({ variables: { teamId } });
        setToPay(teams => teams.filter(elem => elem.id !== teamId));
      }}
      disabled={loading}
    >
      {loading ? <Loader height="1em" /> : <>LEAVE</>}
    </button>
  );
};

export default LeaveBtn;
