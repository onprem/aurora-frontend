import gql from 'graphql-tag';

export default gql`
  mutation VerifyProniteOrder($orderId: String!, $paymentId: String!, $signature: String!) {
    verifyProniteOrder(orderId: $orderId, paymentId: $paymentId, signature: $signature) {
      code
      success
      message
      user {
        pronite
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
      }
    }
  }
`;
