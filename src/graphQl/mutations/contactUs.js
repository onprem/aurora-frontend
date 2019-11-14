import gql from 'graphql-tag';

export default gql`
  mutation ContactUS($name: String!, $email: String!, $message: String!) {
    contactUs(name: $name, email: $email, message: $message) {
      success
      message
      code
    }
  }
`;
