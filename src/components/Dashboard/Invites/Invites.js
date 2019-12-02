import React from 'react';
import classNames from 'classnames';

import InviteItem from './InviteItem';
import useMediaQuery from '../../../utils/useMediaQuery';

import styles from './Invites.module.css';

const Invites = ({ className, teamInvitations }) => {
  const isDesktop = useMediaQuery('(min-width: 500px)');

  const inviteTable = teamInvitations.map((invite, index) => {
    return <InviteItem key={invite.team.id} invite={invite} index={index} isDesktop={isDesktop} />;
  });

  return (
    <section className={classNames(styles.inviteSection, className)}>
      <h2>Pending Invitations</h2>
      {teamInvitations.length > 0 ? (
        <table className={styles.inviteTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>From</th>
              {isDesktop && <th>ARID</th>}
              <th>Event Name</th>
              {isDesktop && <th>Action</th>}
            </tr>
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
