import gql from 'graphql-tag';

export default gql`
  mutation ReVerifyAccOrder($orderId: String!) {
    reVerifyAccOrder(orderId: $orderId) {
      code
      success
      message
    }
  }
`;
