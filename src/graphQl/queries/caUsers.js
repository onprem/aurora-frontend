import gql from 'graphql-tag';

export default gql`
  query CAUsers {
    caUsers {
      id
      name
    }
  }
`;
