import gql from 'graphql-tag';

export default gql`
  query EventTeams(
    $eventId: Int
    $limit: Int
    $page: Int
    $filterBy: String
    $pattern: String
    $sortBy: String
    $sortDir: Int
    $paymentStatus: Boolean!
  ) {
    eventTeams(
      eventId: $eventId
      limit: $limit
      page: $page
      filterBy: $filterBy
      pattern: $pattern
      sortBy: $sortBy
      sortDir: $sortDir
      paymentStatus: $paymentStatus
    ) {
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
          phone
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
