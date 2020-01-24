import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../Loader/Loader';
import getAlert from '../../../utils/getAlert';
import Button from '../../Button/Button';
import UserItem from './UserItem';
import UserModal from '../UserModal/UserModal';
import useDebounce from '../../../utils/useDebounce';

import ALL_USRS from '../../../graphQl/queries/protected/allUsers';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';

import styles from './UserTable.module.css';

const TableWrapper = ({ children, options, handleChange }) => {
  return (
    <>
      <div className={styles.userDivHeading}>
        <span>
          <b>SEARCH: </b>
          <select
            className={styles.usrSelect}
            name="filterBy"
            onChange={handleChange}
            value={options.filterBy}
          >
            <option value="arId">AR-ID</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <input
            className={styles.usrTxt}
            type="text"
            name="pattern"
            placeholder="Search.."
            onChange={handleChange}
            value={options.pattern}
          />
        </span>
        <span>
          <b>SORT: </b>
          <select
            className={styles.usrSelect}
            name="sortBy"
            onChange={handleChange}
            value={options.sortBy}
          >
            <option value="timeSt">Time</option>
            <option value="_id">AR-ID</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <select
            className={styles.usrSelect}
            name="sortDir"
            onChange={handleChange}
            value={options.sortDir}
          >
            <option value="-1">Des</option>
            <option value="1">Asc</option>
          </select>
        </span>
      </div>
      <div className={styles.userDivHeading}>
        <span className={styles.indexSpan}>#</span>
        <span className={styles.nameSpan}>NAME</span>
        <span className={styles.idSpan}>AR-ID</span>
        <span className={styles.emailSpan}>EMAIL</span>
        <span className={styles.citySpan}>CITY</span>
      </div>
      <div className={styles.container}>{children}</div>
    </>
  );
};

const UserTable = ({ metaData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(15);
  const [options, setOptions] = useState({
    filterBy: 'arId',
    pattern: '',
    sortBy: 'timeSt',
    sortDir: '-1',
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

  const { data, loading, fetchMore, refetch } = useQuery(ALL_USRS, {
    variables: {
      limit,
      ...debouncedOptions,
      sortDir: Number(debouncedOptions.sortDir),
    },
    onError: handleErrors,
    // onCompleted: () => setPage(pageN => pageN + 1),
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreUsers = () => {
    fetchMore({
      variables: {
        limit,
        page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          allUsers: {
            ...prev.allUsers,
            users: prev.allUsers.users.concat(fetchMoreResult.allUsers.users),
          },
        };
      },
    });
  };

  useEffect(() => {
    if (data) setPage(Math.floor(data.allUsers.users.length / limit));
  }, [limit, data]);

  useEffect(() => {
    if (debouncedOptions.pattern !== '') {
      refetch();
    }
  }, [debouncedOptions, refetch]);

  const handleChange = event => {
    const { name, value } = event.target;
    setOptions(prev => {
      return { ...prev, [name]: value };
    });
  };

  if (loading && page === 0 && options.pattern === '')
    return (
      <TableWrapper options={options} handleChange={handleChange}>
        <Loader fill="#000000" />
      </TableWrapper>
    );

  const fireModal = user => {
    setModalUser(user);
    setModalOpen(true);
  };

  const { users, total } = data.allUsers;

  const userItems = users.map((user, index) => {
    return <UserItem key={user.id} user={user} index={index + 1} onClick={() => fireModal(user)} />;
  });

  return (
    <>
      <h2 className={styles.usrHeading}>{`USERS (TOTAL:${total})`}</h2>
      <TableWrapper options={options} handleChange={handleChange}>
        {userItems}
        {users.length < total && (
          <Button
            className={styles.moarBtn}
            onClick={fetchMoreUsers}
            Icon={PlusIcon}
            isLoading={loading}
            text="LOAD MORE"
          />
        )}
      </TableWrapper>
      <UserModal
        user={modalUser}
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
        canEditUsers={metaData.canEditUsers}
      />
    </>
  );
};

export default UserTable;
