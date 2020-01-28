import gql from 'graphql-tag';

export default gql`
  query AccOrders(
    $limit: Int
    $page: Int
    $filterBy: String
    $pattern: String
    $sortBy: String
    $sortDir: Int
    $status: String!
  ) {
    accOrders(
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
        users {
          id
          name
          email
          college
          city
          phone
        }
        amount
        finalAmount
        status
        timeSt
      }
    }
  }
`;
