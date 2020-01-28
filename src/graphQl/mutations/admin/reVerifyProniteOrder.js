import gql from 'graphql-tag';

export default gql`
  mutation ReVerifyProniteOrder($orderId: String!) {
    reVerifyProniteOrder(orderId: $orderId) {
      code
      success
      message
    }
  }
`;
