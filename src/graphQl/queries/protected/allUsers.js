import gql from 'graphql-tag';

export default gql`
  query AllUsers(
    $limit: Int
    $page: Int
    $sortBy: String
    $sortDir: Int
    $filterBy: String
    $pattern: String
  ) {
    allUsers(
      limit: $limit
      page: $page
      sortBy: $sortBy
      sortDir: $sortDir
      filterBy: $filterBy
      pattern: $pattern
    ) {
      total
      users {
        id
        name
        email
        phone
        gender
        city
        displayPic
        college
        isVerified
        teams {
          id
          name
          members {
            name
            id
          }
          event {
            id
            name
            fee
            parentEvent
            maxSize
            isNameRequired
          }
          paymentStatus
          pendingInvitations {
            id
            name
          }
        }
        teamInvitations {
          invitedBy {
            id
            name
          }
          team {
            id
            event {
              id
              name
            }
          }
        }
      }
    }
  }
`;
