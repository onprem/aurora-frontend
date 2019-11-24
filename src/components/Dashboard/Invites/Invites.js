import React from 'react';
import classNames from 'classnames';

import Button from '../../Button/Button';
import { ReactComponent as CheckIcon } from '../../../assets/icons/checkmark.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross.svg';

import styles from './Invites.module.css';

const Events = ({ className }) => {
  const pendingInvitations = [
    {
      invitedBy: {
        name: 'Manish Mavi',
        id: 'AR-MAV-127',
      },
      event: {
        name: 'Mr. & Ms. Aurora',
      },
    },
  ];

  const inviteTable = pendingInvitations.map((invite, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{invite.invitedBy.name}</td>
        <td>{invite.invitedBy.id}</td>
        <td>{invite.event.name}</td>
        <td>
          <Button text="ACCEPT" Icon={CheckIcon} onClick={() => alert(invite.event.name)} />
          <Button text="REJECT" Icon={CrossIcon} />
        </td>
      </tr>
    );
  });

  return (
    <section className={classNames(styles.inviteSection, className)}>
      <h2>Pending Invitations</h2>
      <table className={styles.inviteTable}>
        <tr>
          <th>#</th>
          <th>From</th>
          <th>ARID</th>
          <th>Event Name</th>
          <th>Action</th>
        </tr>
        {inviteTable}
      </table>
    </section>
  );
};

export default Events;
