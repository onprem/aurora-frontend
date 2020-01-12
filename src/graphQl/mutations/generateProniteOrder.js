import gql from 'graphql-tag';

export default gql`
  mutation GenerateProniteOrder($userIds: [String!]!) {
    generateProniteOrder(userIds: $userIds) {
      order_id
      amount
      key
    }
  }
`;
