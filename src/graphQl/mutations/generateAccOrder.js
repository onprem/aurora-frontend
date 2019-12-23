import gql from 'graphql-tag';

export default gql`
  mutation GenerateAccOrder($userIds: [String!]!) {
    generateAccOrder(userIds: $userIds) {
      order_id
      amount
      key
    }
  }
`;
