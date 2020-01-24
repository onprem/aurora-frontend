import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loader from '../../Loader/Loader';
import getAlert from '../../../utils/getAlert';

import STATS from '../../../graphQl/queries/protected/stats';

import styles from './Stats.module.css';

const Stats = () => {
  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const { data, loading } = useQuery(STATS, {
    onError: handleErrors,
  });

  if (loading) return <Loader fill="#000000" />;

  const { total, verified, events, onsiteEvents, pronite, accommodation } = data.stats;

  return (
    <div className={styles.statDiv}>
      <span>
        <b>TOTAL: </b>
        {total}
      </span>
      <span>
        <b>VERIFIED: </b>
        {verified}
      </span>
      <span>
        <b>EVENTS: </b>
        {events}
      </span>
      <span>
        <b>ONSITE: </b>
        {onsiteEvents}
      </span>
      <span>
        <b>PRONITE: </b>
        {pronite}
      </span>
      <span>
        <b>ACCO: </b>
        {accommodation}
      </span>
    </div>
  );
};

export default Stats;
