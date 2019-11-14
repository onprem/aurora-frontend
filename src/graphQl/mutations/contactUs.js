import gql from 'graphql-tag';

export default gql`
  mutation ContactUS($name: String!, $email: String!, $subject: String, $message: String!) {
    contactUs(name: $name, email: $email, subject: $subject, message: $message) {
      success
      message
      code
    }
  }
`;
