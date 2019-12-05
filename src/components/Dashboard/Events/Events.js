import React from 'react';
import classNames from 'classnames';
import { useHistory, Link } from 'react-router-dom';

import eventData from '../../../assets/data/eventData/eventData';
import Button from '../../Button/Button';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import useMediaQuery from '../../../utils/useMediaQuery';

import styles from './Events.module.css';

const PaidEvents = ({ teams, isDesktop }) => {
  const teamList = teams.map((team, index) => {
    const parentEvt = team.event.parentEvent;
    const parentEvtName = parentEvt
      ? eventData[parentEvt.replace(/-/gi, '_')].name
      : team.event.name;
    if (isDesktop) {
      return (
        <tr key={team.id}>
          <td>{index + 1}</td>
          <td>
            <Link
              to={{ pathname: `/events/${parentEvt}`, state: { referer: '/dashboard', index: 2 } }}
            >
              {team.event.name}
            </Link>
          </td>
          <td>{parentEvtName}</td>
          <td>{team.id}</td>
        </tr>
      );
    }
    return (
      <tr key={team.id}>
        <td>{index + 1}</td>
        <td>
          <Link
            to={{ pathname: `/events/${parentEvt}`, state: { referer: '/dashboard', index: 2 } }}
          >
            {team.event.name}
          </Link>
        </td>
        <td>{team.id}</td>
      </tr>
    );
  });

  return (
    <>
      <h3>Paid Events</h3>
      {teams.length > 0 ? (
        <table className={styles.evtTable}>
          <thead>
            {isDesktop ? (
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Parent Event</th>
                <th>Team ID</th>
              </tr>
            ) : (
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Team ID</th>
              </tr>
            )}
          </thead>
          <tbody>{teamList}</tbody>
        </table>
      ) : (
        // <span>You have not paid for any events yet.</span>
        <span>Payment for events will start soon.</span>
      )}
    </>
  );
};

const UnPaidEvents = ({ teams, isDesktop }) => {
  const teamList = teams.map((team, index) => {
    const parentEvt = team.event.parentEvent;
    const parentEvtName = parentEvt
      ? eventData[parentEvt.replace(/-/gi, '_')].name
      : team.event.name;
    if (isDesktop) {
      return (
        <tr key={team.id}>
          <td>{index + 1}</td>
          <td>
            <Link
              to={{ pathname: `/events/${parentEvt}`, state: { referer: '/dashboard', index: 2 } }}
            >
              {team.event.name}
            </Link>
          </td>
          <td>{parentEvtName}</td>
          <td>{team.id}</td>
          <td>
            &#8377;
            {team.event.fee}
          </td>
        </tr>
      );
    }
    return (
      <tr key={team.id}>
        <td>{index + 1}</td>
        <td>
          <Link
            to={{ pathname: `/events/${parentEvt}`, state: { referer: '/dashboard', index: 2 } }}
          >
            {team.event.name}
          </Link>
        </td>
        <td>
          &#8377;
          {team.event.fee}
        </td>
      </tr>
    );
  });

  return (
    <>
      <h3>Unpaid Events</h3>
      {teams.length > 0 ? (
        <table className={styles.evtTable}>
          <thead>
            {isDesktop ? (
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Parent Event</th>
                <th>Team ID</th>
                <th>Fee</th>
              </tr>
            ) : (
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Fee</th>
              </tr>
            )}
          </thead>
          <tbody>{teamList}</tbody>
        </table>
      ) : (
        <span>You do not have any unpaid events.</span>
      )}
    </>
  );
};

const Events = ({ className, teams }) => {
  const history = useHistory();
  const isDesktop = useMediaQuery('(min-width: 500px)');

  const paidTeams = teams.filter(team => team.paymentStatus === true);
  const unPaidTeams = teams.filter(team => team.paymentStatus === false);

  return (
    <section className={classNames(styles.eventSection, className)}>
      <h2>Registered Events</h2>
      {paidTeams && (
        <div className={styles.paidDiv}>
          <PaidEvents teams={paidTeams} isDesktop={isDesktop} />
        </div>
      )}
      {unPaidTeams && (
        <div className={styles.pendingDiv}>
          <UnPaidEvents teams={unPaidTeams} isDesktop={isDesktop} />
        </div>
      )}
      <Button
        text="ADD EVENTS"
        Icon={PlusIcon}
        iconPosition="left"
        isLoading={false}
        onClick={() => history.push('/events')}
      />
    </section>
  );
};

Events.defaultProps = {
  teams: [
    {
      id: 'AR-OJ-69-420',
      paymentStatus: true,
      event: {
        name: 'Dancing Dyad',
        id: 'Step Up',
        paid: true,
        fee: 500,
      },
      members: [
        {
          name: 'Ojaswa Sharma',
          id: 'AR-OJ-69',
        },
        {
          name: 'Manish Mavi',
          id: 'AR-MA-100',
        },
      ],
    },
    {
      id: 'AR-OJ-69-421',
      paymentStatus: true,
      event: {
        name: 'Baet the Beat',
        id: 'Step Up',
        paid: true,
        fee: 200,
      },
      members: [
        {
          name: 'Ojaswa Sharma',
          id: 'AR-OJ-69',
        },
      ],
    },
    {
      id: 'AR-OJ-69-422',
      paymentStatus: false,
      event: {
        name: 'Synchro Funk',
        id: 'Step Up',
        paid: false,
        fee: 1000,
      },
      members: [
        {
          name: 'Ojaswa Sharma',
          id: 'AR-OJ-69',
        },
        {
          name: 'Manish Mavi',
          id: 'AR-MA-100',
        },
        {
          name: 'Monish Movi',
          id: 'AR-MO-99',
        },
      ],
    },
  ],
};

export default Events;
