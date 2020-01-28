import gql from 'graphql-tag';

export default gql`
  mutation ReVerifyEvtOrder($orderId: String!) {
    reVerifyEvtOrder(orderId: $orderId) {
      code
      success
      message
    }
  }
`;
