import gql from 'graphql-tag';

export default gql`
  mutation resetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token) {
      code
      message
      success
    }
  }
`;
