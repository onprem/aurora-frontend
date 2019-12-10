import gql from 'graphql-tag';

export default gql`
  mutation GenerateEventOrder($teamIds: [String!]!) {
    generateEventOrder(teamIds: $teamIds) {
      order_id
      amount
      key
    }
  }
`;
