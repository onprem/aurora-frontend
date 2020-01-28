import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../Loader/Loader';
import getAlert from '../../../utils/getAlert';
import Button from '../../Button/Button';
import useDebounce from '../../../utils/useDebounce';
import OrderModal from './OrderModal/OrderModal';

import PRO_ORDERS from '../../../graphQl/queries/protected/proniteOrders';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';

import styles from './Table.module.css';

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
            <option value="orderId">Order-ID</option>
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
            <option value="orderId">orderId</option>
            <option value="status">Status</option>
            <option value="paidBy">AR-ID</option>
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
        <span>
          <select
            className={styles.usrSelect}
            name="status"
            onChange={handleChange}
            value={options.paymentStatus}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="initiated">Initiated</option>
          </select>
        </span>
      </div>
      <div className={styles.userDivHeading}>
        <span className={styles.indexSpan}>#</span>
        <span className={styles.nameSpan}>NAME</span>
        <span className={styles.idSpan}>ORDER-ID</span>
        <span className={styles.payIdSpan}>PAY-ID</span>
        <span className={styles.amountSpan}>AMOUNT</span>
        <span className={styles.statusSpan}>STATUS</span>
      </div>
      <div className={styles.container}>{children}</div>
    </>
  );
};

const OrderItem = ({ order, index, onClick }) => {
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
      <span className={styles.nameSpan}>{order.paidBy.name}</span>
      <span className={styles.idSpan}>{order.orderId}</span>
      <span className={styles.payIdSpan}>{order.paymentId}</span>
      <span className={styles.amountSpan}>{order.amount}</span>
      <span className={styles.statusSpan}>{order.status}</span>
    </div>
  );
};

const ProniteTable = ({ metaData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(15);
  const [options, setOptions] = useState({
    filterBy: 'orderId',
    pattern: '',
    sortBy: 'timeSt',
    sortDir: '-1',
    status: 'all',
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

  const { data, loading, fetchMore, refetch } = useQuery(PRO_ORDERS, {
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
          proniteOrders: {
            ...prev.proniteOrders,
            orders: prev.proniteOrders.orders.concat(fetchMoreResult.proniteOrders.orders),
          },
        };
      },
    });
  };

  useEffect(() => {
    if (data) setPage(Math.floor(data.proniteOrders.orders.length / limit));
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

  const fireModal = order => {
    setModalOrder(order);
    setModalOpen(true);
  };

  const { orders, total } = data.proniteOrders;

  const orderItems = orders.map((order, index) => {
    return (
      <OrderItem
        key={order.orderId}
        order={order}
        index={index + 1}
        onClick={() => fireModal(order)}
      />
    );
  });

  return (
    <>
      <h2 className={styles.usrHeading}>{`PRONITE ORDERS (TOTAL:${total})`}</h2>
      <TableWrapper options={options} handleChange={handleChange}>
        {orderItems}
        {orders.length < total && (
          <Button
            className={styles.moarBtn}
            onClick={fetchMoreUsers}
            Icon={PlusIcon}
            isLoading={loading}
            text="LOAD MORE"
          />
        )}
      </TableWrapper>
      <OrderModal
        order={modalOrder}
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
        canEditOrders={metaData.canEditPronites}
        orderType="pro"
      />
    </>
  );
};

export default ProniteTable;
