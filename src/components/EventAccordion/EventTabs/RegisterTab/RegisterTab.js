/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useAuth } from '../../../../context/auth';

import USER_QUERY from '../../../../graphQl/queries/user';
import EVENT_REGISTER from '../../../../graphQl/mutations/eventRegister';
import SEND_INVITE from '../../../../graphQl/mutations/sendInvite';
import { ARValidation } from '../../../../utils/validation';

import style from './registerTab.module.css';

import Button from '../../../Button/Button';
import getAlert from '../../../../utils/getAlert';
import Invitation from './invitation/Invitation';
import Loader from '../../../Loader/Loader';
import TeamMember from './teamMember/TeamMember';
import PendingInvitations from './pendingInvitation/PendingInvitation';
import { ReactComponent as Register } from '../../../../assets/icons/register.svg';

const RegisterTab = ({ eventId }) => {
  const { authToken } = useAuth();
  const { data, loading, error } = useQuery(USER_QUERY);
  const history = useHistory();
  const [inputs, changeInputs] = useState({ id: '' });
  const userTeam = data ? data.user.teams.filter(team => team.event.id === eventId)[0] : null;
  const handleInput = e => {
    changeInputs({ id: e.target.value });
  };
  const [runEventRegister, eventRegister] = useMutation(EVENT_REGISTER, {
    update: (cacheStore, { data: newData }) => {
      const userData = cacheStore.readQuery({ query: USER_QUERY });
      cacheStore.writeQuery({
        query: USER_QUERY,
        data: {
          user: {
            ...userData.user,
            teams: userData.user.teams.concat([newData.eventRegister.team]),
          },
        },
      });
    },
  });
  const [runSendInvite, sendInvite] = useMutation(SEND_INVITE, {
    update: (cacheStore, { data: newData }) => {
      const userData = cacheStore.readQuery({ query: USER_QUERY });
      const newTeams = userData.user.teams.filter(team => team.id !== userTeam.id);
      newTeams.push(newData.sendInvite.team);
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
  const handleSendInvite = () => {
    const toast = getAlert();
    if (inputs.id) {
      if (ARValidation(inputs.id)) {
        runSendInvite({ variables: { teamId: userTeam.id, arId: inputs.id } });
      } else
        toast.fire({
          icon: 'error',
          title: 'Please enter valid AR-ID',
        });
    } else {
      changeInputs({ id: undefined });
      toast.fire({
        icon: 'error',
        title: 'AR-ID cannot be empty',
      });
    }
  };

  const RenderAfterRegister = (
    <>
      <p>You have successfully registered for the event!</p>
      <div className={style.registerTab_form_container}>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <p>Team ID : {userTeam ? userTeam.id : null}</p>
        <form className={style.registerTab_form}>
          <input
            type="text"
            placeholder="Enter AR-ID"
            name="id"
            value={inputs.id}
            onChange={handleInput}
            required
            className={
              inputs.id
                ? ARValidation(inputs.id)
                  ? style.registerTab_input
                  : `${style.registerTab_input} ${style.registerTab_input_invalid}`
                : inputs.id === undefined
                ? `${style.registerTab_input} ${style.registerTab_input_invalid}`
                : style.registerTab_input
            }
          />
          <Button
            text="SEND INVITE"
            iconPosition="right"
            className={style.registerTab_invite_button}
            onClick={handleSendInvite}
          />
        </form>
      </div>
      <div className={style.registerTab_invitations_container}>
        <h2 className={style.registerTab_heading}>TEAM MEMBERS</h2>
        <hr className={style.registerTab_hr} />
        {userTeam
          ? userTeam.members.map((member, index) => (
              // eslint-disable-next-line react/jsx-indent
              <TeamMember sr={index + 1} member={member} teamid={userTeam.id} user={data.user} />
            ))
          : null}
      </div>
      {userTeam && userTeam.pendingInvitations.length ? (
        <div className={style.registerTab_invitations_container}>
          <h2 className={style.registerTab_heading}>PENDING INVITES</h2>
          <hr className={style.registerTab_hr} />
          {userTeam
            ? userTeam.pendingInvitations.map((invites, index) => (
                // eslint-disable-next-line react/jsx-indent
                <PendingInvitations sr={index + 1} invites={invites} teamid={userTeam.id} />
              ))
            : null}
        </div>
      ) : null}
    </>
  );

  const handleRegister = e => {
    e.preventDefault();
    runEventRegister({ variables: { eventId } });
  };
  useEffect(() => {
    if (eventRegister.error && eventRegister.error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: eventRegister.error.graphQLErrors[0].message,
      });
    }
    if (sendInvite.error && sendInvite.error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: sendInvite.error.graphQLErrors[0].message,
      });
    }
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  }, [eventRegister.error, error, history, sendInvite.error]);
  useEffect(() => {
    if (eventRegister.data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: eventRegister.data.eventRegister.message,
      });
    }
    if (sendInvite.data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: sendInvite.data.sendInvite.message,
      });
      changeInputs({ id: '' });
    }
  }, [eventRegister.data, sendInvite.data]);
  if (loading) return <Loader />;
  return authToken ? (
    userTeam ? (
      <div className={style.parent_registerTab}>{RenderAfterRegister}</div>
    ) : (
      <div className={style.parent_registerTab}>
        <Button
          text="REGISTER"
          iconPosition="right"
          Icon={Register}
          onClick={handleRegister}
          className={style.registerTab_button}
          isLoading={eventRegister.loading}
          disabled={eventRegister.loading}
        />
        <div className={style.registerTab_rules_container}>
          <p className={style.registerTab_rule}>
            * By registering you agree to all the terms and conditions of the event
          </p>
          <p className={style.registerTab_rule}>* Allowed Team size (2-5)</p>
        </div>

        {data.user.teamInvitations.length ? (
          <div className={style.registerTab_invitations_container}>
            <h2 className={style.registerTab_heading}>INVITATIONS</h2>
            <hr className={style.registerTab_hr} />
            {data.user.teamInvitations.map((invite, index) => (
              <Invitation sr={index + 1} invite={invite} />
            ))}
          </div>
        ) : null}
      </div>
    )
  ) : (
    <span>Please Login and try again</span>
  );
};

export default RegisterTab;
