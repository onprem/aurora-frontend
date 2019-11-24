import React from 'react';
import classNames from 'classnames';

import Button from '../../Button/Button';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';

import styles from './Events.module.css';

const PaidEvents = ({ teams }) => {
  const teamList = teams.map((team, index) => {
    return (
      <tr key={team.id}>
        <td>{index + 1}</td>
        <td>{team.event.name}</td>
        <td>{team.event.id}</td>
        <td>{team.id}</td>
      </tr>
    );
  });

  return (
    <>
      <h3>Paid Events</h3>
      <table className={styles.evtTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Parent Event</th>
            <th>Team ID</th>
          </tr>
        </thead>
        <tbody>{teamList}</tbody>
      </table>
    </>
  );
};

const UnPaidEvents = ({ teams }) => {
  const teamList = teams.map((team, index) => {
    return (
      <tr key={team.id}>
        <td>{index + 1}</td>
        <td>{team.event.name}</td>
        <td>{team.event.id}</td>
        <td>{team.id}</td>
        <td>{team.event.fee}</td>
      </tr>
    );
  });

  return (
    <>
      <h3>Unpaid Events</h3>
      <table className={styles.evtTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Parent Event</th>
            <th>Team ID</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>{teamList}</tbody>
      </table>
    </>
  );
};

const Events = ({ className, teams }) => {
  const paidTeams = teams.filter(team => team.paymentStatus === true);
  const unPaidTeams = teams.filter(team => team.paymentStatus === false);

  return (
    <section className={classNames(styles.eventSection, className)}>
      <h2>Registered Events</h2>
      {paidTeams && (
        <div className={styles.paidDiv}>
          <PaidEvents teams={paidTeams} />
        </div>
      )}
      {unPaidTeams && (
        <div className={styles.pendingDiv}>
          <UnPaidEvents teams={unPaidTeams} />
        </div>
      )}
      <Button text="ADD EVENTS" Icon={PlusIcon} iconPosition="left" isLoading={false} />
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
