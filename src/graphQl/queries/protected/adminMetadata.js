import gql from 'graphql-tag';

export default gql`
  query AdminMetadata {
    adminMetadata {
      isRoot
      isEventAdmin
      events {
        id
        name
        isNameRequired
      }
    }
  }
`;
