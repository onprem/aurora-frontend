import gql from 'graphql-tag';

export default gql`
  query EventOrders(
    $limit: Int
    $page: Int
    $filterBy: String
    $pattern: String
    $sortBy: String
    $sortDir: Int
    $status: String!
  ) {
    eventOrders(
      limit: $limit
      page: $page
      filterBy: $filterBy
      pattern: $pattern
      sortBy: $sortBy
      sortDir: $sortDir
      status: $status
    ) {
      total
      orders {
        orderId
        paymentId
        receipt
        paidBy {
          id
          name
          email
          college
          city
          phone
        }
        teams {
          id
          name
          event {
            isNameRequired
            name
          }
          paymentStatus
        }
        amount
        finalAmount
        status
        timeSt
      }
    }
  }
`;
