import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import style from './invitation.module.css';

import getAlert from '../../../../../utils/getAlert';

import { ReactComponent as CrossIcon } from '../../../../../assets/icons/cross.svg';
import { ReactComponent as CheckIcon } from '../../../../../assets/icons/checkmark.svg';
import Loader from '../../../../Loader/Loader';

import ACCEPT_INVITE from '../../../../../graphQl/mutations/acceptInvite';
import DECLINE_INVITE from '../../../../../graphQl/mutations/declineInvite';
import USER_QUERY from '../../../../../graphQl/queries/user';

const Invitations = ({ sr, invite }) => {
  const [runAcceptInvite, { data, error, loading }] = useMutation(ACCEPT_INVITE, {
    update: (cacheStore, { data: newData }) => {
      const userData = cacheStore.readQuery({ query: USER_QUERY });
      const newTeamInvites = userData.user.teamInvitations.filter(
        inviteElem => inviteElem.team.id !== invite.team.id
      );
      const newTeams = userData.user.teams.concat([newData.acceptInvite.team]);
      cacheStore.writeQuery({
        query: USER_QUERY,
        data: {
          user: {
            ...userData.user,
            teams: newTeams,
            teamInvitations: newTeamInvites,
          },
        },
      });
    },
  });

  const [runDeclineInvite, decline] = useMutation(DECLINE_INVITE, {
    update: cacheStore => {
      const userData = cacheStore.readQuery({ query: USER_QUERY });
      const newTeamInvites = userData.user.teamInvitations.filter(
        inviteElem => inviteElem.team.id !== invite.team.id
      );
      cacheStore.writeQuery({
        query: USER_QUERY,
        data: {
          user: {
            ...userData.user,
            teamInvitations: newTeamInvites,
          },
        },
      });
    },
  });
  useEffect(() => {
    if (data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: data.acceptInvite.message,
      });
    }
    if (decline.data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: decline.data.declineInvite.message,
      });
    }
  }, [data, decline.data]);

  useEffect(() => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
    if (decline.error && decline.error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: decline.error.graphQLErrors[0].message,
      });
    }
  }, [error, decline.error]);
  return (
    <div className={style.invitation_container}>
      <span className={style.invitation_content_sr}>{sr}</span>
      <span className={style.invitation_content}>{invite.invitedBy.name}</span>
      <span className={style.invitation_content}>{invite.invitedBy.id}</span>
      <span className={style.invitation_button_container}>
        <button
          type="button"
          onClick={() => runAcceptInvite({ variables: { teamId: invite.team.id } })}
          className={style.invitation_button}
          disabled={loading}
        >
          {loading ? (
            <Loader fill="#000000" />
          ) : (
            <>
              ACCEPT
              <CheckIcon className={style.cross} />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => runDeclineInvite({ variables: { teamId: invite.team.id } })}
          className={style.invitation_button}
          disabled={decline.loading}
        >
          {decline.loading ? (
            <Loader fill="#000000" />
          ) : (
            <>
              REJECT
              <CrossIcon className={style.cross} />
            </>
          )}
        </button>
      </span>
    </div>
  );
};

export default Invitations;
