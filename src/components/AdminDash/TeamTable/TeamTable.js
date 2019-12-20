import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../Loader/Loader';
import getAlert from '../../../utils/getAlert';
import Button from '../../Button/Button';
import TeamItem from './TeamItem';
import TeamModal from '../TeamModal/TeamModal';

import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import EVT_TEAMS from '../../../graphQl/queries/protected/eventTeams';

import styles from './TeamTable.module.css';

const TableBody = ({ event }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTeam, setModalTeam] = useState(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(10);

  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const { data, loading, fetchMore } = useQuery(EVT_TEAMS, {
    variables: {
      eventId: event.id,
      limit,
    },
    onError: handleErrors,
    onCompleted: () => setPage(pageN => pageN + 1),
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
          allUsers: {
            ...prev.eventTeams,
            users: prev.eventTeams.teams.concat(fetchMoreResult.eventTeams.teams),
          },
        };
      },
    });
  };

  if (loading && page === 0)
    return (
      <>
        <div className={styles.teamDivHeading}>
          <span className={styles.indexSpan}>#</span>
          <span className={styles.idSpan}>TEAM-ID</span>
          {event.isNameRequired && <span className={styles.nameSpan}>TEAM NAME</span>}
          <span className={styles.usersSpan}>MEMBERS</span>
          <span className={styles.paymentSpan}>PAYMENT</span>
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
  return (
    <div className={styles.teamTable}>
      <TableBody event={events[0]} />
    </div>
  );
};

export default TeamTable;
