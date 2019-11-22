import gql from 'graphql-tag';

export default gql`
  mutation VerifyRegister($token: String!) {
    verifyRegister(token: $token)
  }
`;
