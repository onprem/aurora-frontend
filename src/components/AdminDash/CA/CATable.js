import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../Loader/Loader';
import getAlert from '../../../utils/getAlert';
import Button from '../../Button/Button';
import useDebounce from '../../../utils/useDebounce';
import CAModal from './CAModal/CAModal';

import ALL_CA from '../../../graphQl/queries/protected/allCA';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';

import styles from './CATable.module.css';

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
        <span className={styles.collegeSpan}>COLLEGE</span>
        <span className={styles.citySpan}>CITY</span>
        <span className={styles.paidUsersSpan}>PAID USERS</span>
      </div>
      <div className={styles.container}>{children}</div>
    </>
  );
};

const CAItem = ({ ca, index, onClick }) => {
  const handleKeyDown = event => {
    if (event.key === 'Enter') onClick();
  };

  return (
    <div
      className={styles.userDiv}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      <span className={styles.indexSpan}>{index}</span>
      <span className={styles.nameSpan}>{ca.user.name}</span>
      <span className={styles.collegeSpan}>{ca.user.college}</span>
      <span className={styles.citySpan}>{ca.user.city}</span>
      <span className={styles.paidUsersSpan}>{ca.paidUsers.length}</span>
    </div>
  );
};

const CATable = ({ metaData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalCA, setModalCA] = useState(null);
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

  const { data, loading, fetchMore, refetch } = useQuery(ALL_CA, {
    variables: {
      limit,
      ...debouncedOptions,
      sortDir: Number(debouncedOptions.sortDir),
    },
    onError: handleErrors,
    // onCompleted: () => setPage(pageN => pageN + 1),
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreCA = () => {
    fetchMore({
      variables: {
        limit,
        page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          allCA: {
            ...prev.allCA,
            caUsers: prev.allCA.caUsers.concat(fetchMoreResult.allCA.caUsers),
          },
        };
      },
    });
  };

  useEffect(() => {
    if (data) setPage(Math.floor(data.allCA.caUsers.length / limit));
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

  const fireModal = ca => {
    setModalCA(ca);
    setModalOpen(true);
  };

  const { caUsers, total } = data.allCA;

  const caItems = caUsers.map((c, index) => {
    return <CAItem key={c.id} ca={c} index={index + 1} onClick={() => fireModal(c)} />;
  });

  return (
    <>
      <h2 className={styles.usrHeading}>{`Campus Ambassadors (TOTAL:${total})`}</h2>
      <TableWrapper options={options} handleChange={handleChange}>
        {caItems}
        {caUsers.length < total && (
          <Button
            className={styles.moarBtn}
            onClick={fetchMoreCA}
            Icon={PlusIcon}
            isLoading={loading}
            text="LOAD MORE"
          />
        )}
      </TableWrapper>
      <CAModal
        ca={modalCA}
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
        canEditCA={metaData.canEditCA}
      />
    </>
  );
};

export default CATable;
