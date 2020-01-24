import gql from 'graphql-tag';

export default gql`
  query Stats {
    stats {
      total
      verified
      events
      onsiteEvents
      pronite
      accommodation
    }
  }
`;
