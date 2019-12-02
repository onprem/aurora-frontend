import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

import getAlert from '../utils/getAlert';
// import { useAuth } from '../context/auth';

const useApolloClient = authToken => {
  const uri =
    process.env.REACT_APP_ENV === 'production'
      ? 'https://api.aurorafest.org/api/graphql'
      : 'https://api.staging.aurorafest.org/api/graphql';

  const backendLink = new HttpLink({ uri });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: authToken ? `bearer ${authToken}` : '',
      },
    };
  });

  const errLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    if (networkError) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: `Network Error: ${networkError.message}`,
      });
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError}`);
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([errLink, authLink, backendLink]),
    cache: new InMemoryCache(),
  });
};

export default useApolloClient;
