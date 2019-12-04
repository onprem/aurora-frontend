import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Particle from '../../components/particles/Particle';
import Social from '../../components/Social/Social';

import VERIFY from '../../graphQl/mutations/verify';

const Verify = () => {
  const [runVerify, { data, error, loading }] = useMutation(VERIFY);
  const history = useHistory();
  const { token } = useParams();

  useEffect(() => {
    runVerify({ variables: { token } });
  }, [runVerify, token]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (data) {
      const redirTimeout = window.setTimeout(() => {
        history.push('/login');
      }, 4000);
      return () => {
        window.clearTimeout(redirTimeout);
      };
    }
  }, [data, history]);

  return (
    <>
      {data && (
        <>
          <h1>{data.verifyRegister.message}</h1>
          <h2>You will be redirected to Login page shortly.</h2>
        </>
      )}
      {error && <h1>{error.graphQLErrors[0].message}</h1>}
      {loading && <Loader />}
      <Particle />
      <Social fill="#000000" />
    </>
  );
};

export default Verify;
