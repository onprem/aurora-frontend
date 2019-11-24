import React from 'react';
import classNames from 'classnames';

import Button from '../../Button/Button';
import { ReactComponent as CheckIcon } from '../../../assets/icons/checkmark.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross.svg';

import styles from './Invites.module.css';

const Invites = ({ className, teamInvitations }) => {
  const inviteTable = teamInvitations.map((invite, index) => {
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
  });

  return (
    <section className={classNames(styles.inviteSection, className)}>
      <h2>Pending Invitations</h2>
      <table className={styles.inviteTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>From</th>
            <th>ARID</th>
            <th>Event Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{inviteTable}</tbody>
      </table>
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
  ],
};

export default Invites;
