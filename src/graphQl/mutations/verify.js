import gql from 'graphql-tag';

export default gql`
  mutation Verify($token: String!) {
    verifyRegister(token: $token) {
      code
      message
    }
  }
`;
