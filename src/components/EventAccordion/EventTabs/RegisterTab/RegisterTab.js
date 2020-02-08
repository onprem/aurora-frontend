/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2/src/sweetalert2';

import { useHistory, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useAuth } from '../../../../context/auth';

import USER_QUERY from '../../../../graphQl/queries/user';
import EVENT_REGISTER from '../../../../graphQl/mutations/eventRegister';
import SEND_INVITE from '../../../../graphQl/mutations/sendInvite';
import CHANGE_TEAM_NAME from '../../../../graphQl/mutations/changeTeamName';
import { ARValidation } from '../../../../utils/validation';

import style from './registerTab.module.css';

import Button from '../../../Button/Button';
import getAlert from '../../../../utils/getAlert';
import Invitation from './invitation/Invitation';
import Loader from '../../../Loader/Loader';
import TeamMember from './teamMember/TeamMember';
import PendingInvitations from './pendingInvitation/PendingInvitation';
import { ReactComponent as Register } from '../../../../assets/icons/register.svg';
import { ReactComponent as Inv } from '../../../../assets/icons/sendInvite.svg';
import { ReactComponent as Arrow } from '../../../../assets/icons/arrowLeft.svg';
import { ReactComponent as Tick } from '../../../../assets/icons/tick.svg';
import { ReactComponent as Edit } from '../../../../assets/icons/edit.svg';
import { ReactComponent as Cross } from '../../../../assets/icons/cut.svg';

const RegisterTab = ({ eventId, teamMaxSize }) => {
  const location = useLocation();
  const { authToken } = useAuth();
  const { data, loading } = useQuery(USER_QUERY);
  const history = useHistory();
  const [inputs, changeInputs] = useState({ id: '' });
  const userTeam = data ? data.user.teams.filter(team => team.event.id === eventId)[0] : null;
  const userInvitations = data
    ? data.user.teamInvitations.filter(invitation => invitation.team.event.id === eventId)
    : null;
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
  const handleSendInvite = e => {
    e.preventDefault();
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
  const [teamName, changeTeamName] = useState({
    name: '',
  });
  const [isEditingTeamName, changeIsEditingTeamName] = useState(false);
  const [runteamNameChange, teamNameChange] = useMutation(CHANGE_TEAM_NAME, {
    update: (cacheStore, { data: newData }) => {
      const userData = cacheStore.readQuery({ query: USER_QUERY });
      const newTeams = userData.user.teams.filter(team => team.id !== userTeam.id);
      newTeams.push(newData.setTeamName.team);
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
  const handleTeamNameInput = e => {
    changeTeamName({ name: e.target.value });
  };
  const handleTeamNameSubmit = e => {
    e.preventDefault();
    if (isEditingTeamName) {
      if (teamName.name) {
        runteamNameChange({ variables: { teamId: userTeam.id, name: teamName.name } });
        changeIsEditingTeamName(!isEditingTeamName);
      } else {
        const toast = getAlert();
        toast.fire({
          icon: 'error',
          title: 'Team Name cannot be empty',
        });
      }
    } else {
      changeIsEditingTeamName(!isEditingTeamName);
      setTimeout(() => {
        document.getElementById('team_input').focus();
      }, 1);
    }
  };
  const RenderAfterRegister = (
    <>
      <p>You have successfully registered for the event!</p>
      <div className={style.registerTab_form_container}>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <p className={style.registerTab_form_p}>Team ID : {userTeam ? userTeam.id : null}</p>
        {userTeam && userTeam.members.length + userTeam.pendingInvitations.length < teamMaxSize && (
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
            <button
              type="submit"
              onClick={handleSendInvite}
              className={style.registerTab_invite_button}
              disabled={sendInvite.loading}
            >
              {sendInvite.loading ? (
                <Loader />
              ) : (
                <>
                  Send Invite
                  <Inv className={style.inv} />
                </>
              )}
            </button>
          </form>
        )}
        {userTeam && userTeam.event.isNameRequired && (
          <form className={style.registerTab_teamName_form}>
            <p className={(style.registerTab_form_p, style.registerTab_form_p_team)}>Team Name: </p>
            {!isEditingTeamName ? (
              <p className={(style.registerTab_form_p, style.userTeam_name)}>
                {userTeam.name ? userTeam.name : 'Please set your team name'}
              </p>
            ) : (
              <input
                type="text"
                placeholder={userTeam ? userTeam.name : ''}
                name="name"
                id="team_input"
                value={teamName.name}
                onChange={handleTeamNameInput}
                className={style.registerTab_teamName_input}
              />
            )}
            {isEditingTeamName && (
              <button
                type="button"
                onClick={() => changeIsEditingTeamName(!isEditingTeamName)}
                className={style.registerTab_teamChange_button}
                disabled={teamNameChange.loading}
              >
                <Cross fill="white" />
              </button>
            )}
            <button
              type="submit"
              onClick={handleTeamNameSubmit}
              className={style.registerTab_teamChange_button}
              disabled={teamNameChange.loading}
            >
              {teamNameChange.loading ? (
                <Loader />
              ) : !isEditingTeamName ? (
                <Edit className={style.edit} fill="white" />
              ) : (
                <Tick className={style.tick} fill="white" />
              )}
            </button>
          </form>
        )}
        <p className={style.max_size}>{`* Max size of team is ${teamMaxSize}`}</p>
      </div>
      <div className={style.registerTab_invitations_container}>
        <h2 className={style.registerTab_heading}>TEAM MEMBERS</h2>
        <hr className={style.registerTab_hr} />
        {userTeam
          ? userTeam.members.map((member, index) => (
              // eslint-disable-next-line react/jsx-indent
              <TeamMember
                key={index}
                sr={index + 1}
                member={member}
                teamid={userTeam.id}
                user={data.user}
              />
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
                <PendingInvitations
                  key={index}
                  sr={index + 1}
                  invites={invites}
                  teamid={userTeam.id}
                />
              ))
            : null}
        </div>
      ) : null}
      {userTeam?.paymentStatus ? (
        <div className={style.alreadypaid_container}>
          <h3 className={style.accomodation_h3}>Event Fees Successfully Paid</h3>
          <svg
            className={style.checkmark1}
            id="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className={style.checkmark__circle1}
              id="circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path className={style.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
      ) : (
        <button
          type="button"
          className={style.registerTab_invite_button}
          style={{ marginTop: '20px' }}
          onClick={() => history.push('/dashboard')}
        >
          PAY NOW
        </button>
      )}
    </>
  );

  const handleRegister = e => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text:
        'Registering your own team will automatically reject all your invitations for the current event.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'white',
      cancelButtonColor: 'white',
      cancelButtonText: '<span style="color:black; font-weight:600">Cancel</span>',
      confirmButtonText: '<span style="color:black; font-weight:600">Register</span>',
    }).then(result => {
      if (result.value) {
        runEventRegister({ variables: { eventId } });
      }
    });
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
    if (teamNameChange.error && teamNameChange.error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: teamNameChange.error.graphQLErrors[0].message,
      });
    }
  }, [eventRegister.error, sendInvite.error, teamNameChange.error]);
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
    if (teamNameChange.data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: teamNameChange.data.setTeamName.message,
      });
    }
  }, [eventRegister.data, sendInvite.data, teamNameChange.data]);
  if (loading) return <Loader />;
  return authToken ? (
    userTeam ? (
      <div className={style.parent_registerTab}>{RenderAfterRegister}</div>
    ) : eventId === 2 || eventId === 7 ? (
      <div className={style.parent_registerTab}>
        <h3>Event registration for this event is closed.</h3>
      </div>
    ) : (
      <div className={style.parent_registerTab}>
        <button
          type="submit"
          onClick={handleRegister}
          className={style.registerTab_button}
          disabled={eventRegister.loading}
        >
          {eventRegister.loading ? (
            <Loader />
          ) : (
            <>
              Register
              <Register className={style.inv} />
            </>
          )}
        </button>
        <div className={style.registerTab_rules_container}>
          <p className={style.registerTab_rule}>
            * By registering you agree to all the terms and conditions of the event
          </p>
          <p className={style.registerTab_rule}>{`* Max Team size is ${teamMaxSize}`}</p>
        </div>

        {userInvitations && userInvitations.length ? (
          <div className={style.registerTab_invitations_container}>
            <h2 className={style.registerTab_heading}>INVITATIONS</h2>
            <hr className={style.registerTab_hr} />
            {userInvitations.map((invite, index) => (
              <Invitation key={index} sr={index + 1} invite={invite} />
            ))}
          </div>
        ) : null}
      </div>
    )
  ) : (
    <div className={style.must_auth_container}>
      <p>Please login to continue with the registration process !</p>
      <Button
        text="LOGIN"
        iconPosition="right"
        Icon={Arrow}
        className={style.must_auth_button}
        onClick={
          () =>
            history.push({ pathname: '/login', state: { referer: location.pathname, index: 2 } })
          // eslint-disable-next-line react/jsx-curly-newline
        }
      />
    </div>
  );
};

// const RegistrationsClosed = () => {
//   return (
//     <h2 className={style.heavy_participation}>
//       Due to heavy participation, registrations are closed.
//     </h2>
//   );
// };

export default RegisterTab;
