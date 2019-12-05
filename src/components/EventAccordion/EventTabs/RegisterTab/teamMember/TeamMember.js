import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../../../../Button/Button';
import Loader from '../../../../Loader/Loader';
import { ReactComponent as Leave } from '../../../../../assets/icons/leaveTeam.svg';
import { ReactComponent as Cross } from '../../../../../assets/icons/cross.svg';

import getAlert from '../../../../../utils/getAlert';

import LEAVE_TEAM from '../../../../../graphQl/mutations/leaveTeam';
import REMOVE_MEMBER from '../../../../../graphQl/mutations/removeMember';
import USER_QUERY from '../../../../../graphQl/queries/user';

import style from '../invitation/invitation.module.css';

const TeamMember = ({ sr, member, user, teamid }) => {
  const [runLeaveTeam, { data, error, loading }] = useMutation(LEAVE_TEAM, {
    update: cacheStore => {
      const userData = cacheStore.readQuery({ query: USER_QUERY });
      const newTeams = user.teams.filter(team => team.id !== teamid);
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
  const [runRemoveMember, removeMember] = useMutation(REMOVE_MEMBER, {
    update: cacheStore => {
      const userData = cacheStore.readQuery({ query: USER_QUERY });
      const newTeams = [];
      user.teams.map(team => {
        if (team.id === teamid) {
          const members = [];
          team.members.map(mem => {
            if (mem.id !== member.id) members.push(mem);
          });
          newTeams.push({ ...team, members });
        } else newTeams.push(team);
      });
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

  useEffect(() => {
    if (data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: data.leaveTeam.message,
      });
    }
    if (removeMember.data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: removeMember.data.removeMember.message,
      });
    }
  }, [data, removeMember.data]);
  useEffect(() => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
    if (removeMember.error && removeMember.error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: removeMember.error.graphQLErrors[0].message,
      });
    }
  }, [error, removeMember.error]);

  return (
    <div className={style.invitation_container}>
      <span className={(style.invitation_content, style.invitation_content_sr)}>{sr}</span>
      <span className={style.invitation_content}>{member.name}</span>
      <span className={style.invitation_content}>{member.id}</span>
      {member.id === user.id ? (
        <Button
          iconPosition="right"
          text={loading ? <Loader /> : `LEAVE`}
          Icon={loading ? null : Leave}
          className={style.member_button}
          onClick={() => runLeaveTeam({ variables: { teamId: teamid } })}
          isLoading={loading}
          disabled={loading}
        />
      ) : (
        <Button
          iconPosition="right"
          text={removeMember.loading ? <Loader /> : `REMOVE`}
          Icon={removeMember.loading ? null : Cross}
          className={style.member_button}
          onClick={() => runRemoveMember({ variables: { teamId: teamid, arId: member.id } })}
          isLoading={removeMember.loading}
          disabled={removeMember.loading}
        />
      )}
    </div>
  );
};
export default TeamMember;
