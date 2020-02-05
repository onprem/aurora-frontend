import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Particle from '../../components/particles/Particle';
import Social from '../../components/Social/Social';

import SET_CA from '../../graphQl/mutations/setCA';

const SetCA = () => {
  const [runSetCA, { data, error, loading }] = useMutation(SET_CA);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    runSetCA({ variables: { id } });
  }, [runSetCA, id]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (data) {
      const redirTimeout = window.setTimeout(() => {
        history.push('/ca');
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
          <h1>{data.setCA.message}</h1>
        </>
      )}
      {error && <h1>{error.graphQLErrors[0].message}</h1>}
      {loading && <Loader />}
      <Particle />
      <Social fill="#000000" />
    </>
  );
};

export default SetCA;
