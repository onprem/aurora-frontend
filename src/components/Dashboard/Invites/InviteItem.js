import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';
import { ReactComponent as CheckIcon } from '../../../assets/icons/checkmark.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross.svg';
import getAlert from '../../../utils/getAlert';

import ACCEPT_INVITE from '../../../graphQl/mutations/acceptInvite';
import DECLINE_INVITE from '../../../graphQl/mutations/declineInvite';
import USER_QUERY from '../../../graphQl/queries/user';

const InviteItem = ({ invite, index, isDesktop }) => {
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
    <tr key={invite.team.id}>
      <td>{index + 1}</td>
      <td>{invite.invitedBy.name}</td>
      {isDesktop && <td>{invite.invitedBy.id}</td>}
      <td>{invite.team.event.name}</td>
      <td>
        <Button
          onClick={() => runAcceptInvite({ variables: { teamId: invite.team.id } })}
          text={loading ? <Loader /> : `ACCEPT`}
          Icon={loading ? null : CheckIcon}
        />
        <Button
          onClick={() => runDeclineInvite({ variables: { teamId: invite.team.id } })}
          text={decline.loading ? <Loader /> : `REJECT`}
          Icon={decline.loading ? null : CrossIcon}
        />
      </td>
    </tr>
  );
};

export default InviteItem;
