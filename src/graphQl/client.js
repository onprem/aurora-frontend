import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

const uri =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://api.aurorafest.org/api/graphql'
    : 'https://api.staging.aurorafest.org/api/graphql';

const backendLink = new HttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : '',
    },
  };
});

// const errLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
//     );
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const client = new ApolloClient({
  link: ApolloLink.from([authLink, backendLink]),
  cache: new InMemoryCache(),
});

export default client;