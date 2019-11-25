import React from 'react';
import classNames from 'classnames';

import Button from '../../Button/Button';
import { ReactComponent as CheckIcon } from '../../../assets/icons/checkmark.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross.svg';
import useMediaQuery from '../../../utils/useMediaQuery';

import styles from './Invites.module.css';

const Invites = ({ className, teamInvitations }) => {
  const isDesktop = useMediaQuery('(min-width: 500px)');

  const inviteTable = teamInvitations.map((invite, index) => {
    if (isDesktop) {
      return (
        <tr key={invite.team.id}>
          <td>{index + 1}</td>
          <td>{invite.invitedBy.name}</td>
          <td>{invite.invitedBy.id}</td>
          <td>{invite.team.event.name}</td>
          <td>
            <Button text="ACCEPT" Icon={CheckIcon} />
            <Button text="REJECT" Icon={CrossIcon} />
          </td>
        </tr>
      );
    }
    return (
      <tr key={invite.team.id}>
        <td>{index + 1}</td>
        <td>{invite.invitedBy.name}</td>
        <td>{invite.team.event.name}</td>
        <td>
          <Button text="ACCEPT" Icon={CheckIcon} />
          <Button text="REJECT" Icon={CrossIcon} />
        </td>
      </tr>
    );
  });

  return (
    <section className={classNames(styles.inviteSection, className)}>
      <h2>Pending Invitations</h2>
      {teamInvitations.length > 0 ? (
        <table className={styles.inviteTable}>
          <thead>
            {isDesktop ? (
              <tr>
                <th>#</th>
                <th>From</th>
                <th>ARID</th>
                <th>Event Name</th>
                <th>Action</th>
              </tr>
            ) : (
              <tr>
                <th>#</th>
                <th>From</th>
                <th>Event Name</th>
              </tr>
            )}
          </thead>

          <tbody>{inviteTable}</tbody>
        </table>
      ) : (
        <span>You don&apos;t have any team invitations yet.</span>
      )}
    </section>
  );
};

Invites.defaultProps = {
  teamInvitations: [
    {
      invitedBy: {
        name: 'Manish Mavi',
        id: 'AR-MAV-127',
      },
      team: {
        id: 'AR-MAV-127-154',
        event: {
          name: 'Mr. & Ms. Aurora',
        },
      },
    },
    {
      invitedBy: {
        name: 'Manish Mavi',
        id: 'AR-MAV-127',
      },
      team: {
        id: 'AR-MAV-127-154',
        event: {
          name: 'Mr. & Ms. Aurora',
        },
      },
    },
    {
      invitedBy: {
        name: 'Manish Mavi',
        id: 'AR-MAV-127',
      },
      team: {
        id: 'AR-MAV-127-154',
        event: {
          name: 'Mr. & Ms. Aurora',
        },
      },
    },
  ],
};

export default Invites;
