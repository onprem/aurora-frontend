import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Particles from '../../components/particles/Particle';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import getAlert from '../../utils/getAlert';

import USR_QUERY from '../../graphQl/queries/user';
import CA_USER from '../../graphQl/queries/caUsers';
import SET_CA from '../../graphQl/mutations/setCA';

import styles from './CA.module.css';

const CAWrapper = ({ user }) => {
  const { data, loading } = useQuery(CA_USER);

  if (loading) return <Loader fill="#000000" />;

  const link = `https://aurorafest.org/setca/${user.id}`;

  return (
    <>
      <div className={styles.caDiv}>
        <section className={styles.caLink}>
          <b>Your Referral link: &nbsp;</b>
          <a href={link}>{link}</a>
        </section>
        <h1>{`Paid Referred Users (Total: ${data.caUsers.length})`}</h1>
        <div className={styles.caTableScroll}>
          <table className={styles.caTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>AR-ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.caUsers.map((u, i) => {
                return (
                  <tr key={u.id}>
                    <td>{i + 1}</td>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h1>{`All Referred Users (Total: ${user.ca.users.length})`}</h1>
        <div className={styles.caTableScroll}>
          <table className={styles.caTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>AR-ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {user.ca.users.map((u, i) => {
                return (
                  <tr key={u.id}>
                    <td>{i + 1}</td>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Particles />
    </>
  );
};

const UserWrapper = ({ user }) => {
  const [id, setId] = useState('');

  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  };

  const [runSetCA, { loading }] = useMutation(SET_CA, {
    onError: handleErrors,
    update: cacheStore => {
      const usrData = cacheStore.readQuery({ query: USR_QUERY });
      cacheStore.writeQuery({
        query: USR_QUERY,
        data: {
          user: {
            ...usrData.user,
            ca: {
              ...usrData.user.ca,
              caId: id.toUpperCase(),
            },
          },
        },
      });
    },
  });
  if (!user.ca.caId)
    return (
      <>
        <div className={styles.caDiv}>
          <h1>Refer a Campus Ambassador</h1>
          <form className={styles.caForm}>
            <input
              type="text"
              name="id"
              onChange={e => setId(e.target.value)}
              placeholder="AR-XXX-123"
            />
            <Button
              type="submit"
              text="Set CA"
              isLoading={loading}
              onClick={e => {
                e.preventDefault();
                runSetCA({ variables: { id } });
              }}
            />
          </form>
        </div>
        <Particles />
      </>
    );

  return (
    <>
      <div className={styles.caDiv}>
        <h1>
          You have referred the CA -&nbsp;
          {user.ca.caId}
        </h1>
      </div>
      <Particles />
    </>
  );
};

const CA = () => {
  const [err, setErr] = useState(false);
  const history = useHistory();

  const handleErrors = error => {
    if (error && error.graphQLErrors.length > 0) {
      if (error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
        history.push('/logout');
      } else {
        setErr(true);
        const toast = getAlert();
        toast.fire({
          icon: 'error',
          title: error.graphQLErrors[0].message,
        });
      }
    }
  };

  const { data, loading } = useQuery(USR_QUERY, {
    onError: handleErrors,
  });

  if (loading || err) return <Loader fill="#000000" />;

  if (data.user.ca.isCA) return <CAWrapper user={data.user} />;

  return <UserWrapper user={data.user} />;
};

export default CA;
