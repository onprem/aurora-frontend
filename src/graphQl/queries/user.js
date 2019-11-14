import gql from 'graphql-tag';

export default gql`
  query User {
    user {
      id
      name
      email
      phone
    }
  }
`;
