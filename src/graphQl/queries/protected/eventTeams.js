import gql from 'graphql-tag';

export default gql`
  query EventTeams($eventId: Int, $limit: Int, $page: Int, $sortBy: String, $sortDir: Int) {
    eventTeams(eventId: $eventId, limit: $limit, page: $page, sortBy: $sortBy, sortDir: $sortDir) {
      total
      teams {
        id
        name
        members {
          id
          name
          email
          college
          city
        }
        paymentStatus
        pendingInvitations {
          id
          name
        }
      }
    }
  }
`;
