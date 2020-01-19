/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../Loader/Loader';
import getAlert from '../../../utils/getAlert';
import Button from '../../Button/Button';
import TeamItem from './TeamItem';
import TeamModal from '../TeamModal/TeamModal';
import useDebounce from '../../../utils/useDebounce';

import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import EVT_TEAMS from '../../../graphQl/queries/protected/eventTeams';

import styles from './TeamTable.module.css';

const TableBody = ({ event, setTotal }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTeam, setModalTeam] = useState(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(25);
  const [options, setOptions] = useState({
    filterBy: 'member',
    pattern: '',
    paymentStatus: 'paid',
  });
  const debouncedOptions = useDebounce(options, 500);

  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const { data, loading, fetchMore, refetch } = useQuery(EVT_TEAMS, {
    variables: {
      eventId: event.id,
      limit,
      ...debouncedOptions,
      paymentStatus: debouncedOptions.paymentStatus === 'paid',
    },
    onError: handleErrors,
    // onCompleted: () => setPage(pageN => pageN + 1),
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreTeams = () => {
    fetchMore({
      variables: {
        limit,
        page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          eventTeams: {
            ...prev.eventTeams,
            teams: prev.eventTeams.teams.concat(fetchMoreResult.eventTeams.teams),
          },
        };
      },
    });
  };

  useEffect(() => {
    if (data) setPage(Math.floor(data.eventTeams.teams.length / limit));
  }, [event, limit, data]);

  useEffect(() => {
    if (debouncedOptions.pattern !== '') {
      console.log(debouncedOptions);
      refetch();
    }
  }, [debouncedOptions, refetch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setOptions(prev => {
      return { ...prev, [name]: value };
    });
  };

  if (loading && page === 0)
    return (
      <>
        <div className={styles.teamDivHeading}>
          <span>
            <b>SEARCH: </b>
            <select
              className={styles.teamSelect}
              name="filterBy"
              onChange={handleChange}
              value={options.filterBy}
            >
              <option value="member">Name</option>
              <option value="memberId">AR-ID</option>
              <option value="memberEmail">Email</option>
              <option value="teamId">Team ID</option>
            </select>
            <input
              className={styles.teamTxt}
              type="text"
              name="pattern"
              placeholder="Search.."
              onChange={handleChange}
              value={options.pattern}
            />
          </span>
          <span>
            <select
              className={styles.teamSelect}
              name="paymentStatus"
              onChange={handleChange}
              value={options.paymentStatus}
            >
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </span>
        </div>
        <div className={styles.container} style={{ justifyContent: 'center' }}>
          <Loader fill="#000000" />
        </div>
      </>
    );

  const fireModal = team => {
    setModalTeam(team);
    setModalOpen(true);
  };

  const { teams, total } = data.eventTeams;

  setTotal(total);

  const teamItems = teams.map((team, index) => {
    return (
      <TeamItem
        key={team.id}
        team={team}
        isNameRequired={event.isNameRequired}
        index={index + 1}
        onClick={() => fireModal(team)}
      />
    );
  });

  return (
    <>
      <div className={styles.teamDivHeading}>
        <span>
          <b>SEARCH: </b>
          <select
            className={styles.teamSelect}
            name="filterBy"
            onChange={handleChange}
            value={options.filterBy}
          >
            <option value="member">Name</option>
            <option value="memberId">AR-ID</option>
            <option value="memberEmail">Email</option>
            <option value="teamId">Team ID</option>
          </select>
          <input
            className={styles.teamTxt}
            type="text"
            name="pattern"
            placeholder="Search.."
            onChange={handleChange}
            value={options.pattern}
          />
        </span>
        <span>
          <select
            className={styles.teamSelect}
            name="paymentStatus"
            onChange={handleChange}
            value={options.paymentStatus}
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </span>
      </div>
      <div className={styles.teamDivHeading}>
        <span className={styles.indexSpan}>#</span>
        <span className={styles.idSpan}>TEAM-ID</span>
        {event.isNameRequired && <span className={styles.nameSpan}>TEAM NAME</span>}
        <span className={styles.usersSpan}>MEMBERS</span>
        <span className={styles.paymentSpan}>PAYMENT</span>
      </div>
      <div className={styles.container}>
        {teamItems}
        {teams.length < total && (
          <Button
            className={styles.moarBtn}
            onClick={fetchMoreTeams}
            Icon={PlusIcon}
            isLoading={loading}
            text="LOAD MORE"
          />
        )}
      </div>
      <TeamModal team={modalTeam} isOpen={isModalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

const TeamTable = ({ events }) => {
  const [event, setEvent] = useState(events[0]);
  const [total, setTotal] = useState(0);

  const handleChange = e => {
    setEvent(events[Number(e.target.value)]);
  };

  return (
    <div className={styles.teamTable}>
      <div className={styles.evtDiv}>
        <h2 className={styles.evtHead}>{`${event.name} (TOTAL TEAMS: ${total})`}</h2>
        <div>
          <label className={styles.label}>CHANGE EVENT: </label>
          <select className={styles.evtSelect} name="event" onChange={handleChange}>
            {events.map((evt, index) => {
              return (
                <option key={evt.id} value={index}>
                  {evt.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <TableBody event={event} setTotal={setTotal} />
    </div>
  );
};

export default TeamTable;
