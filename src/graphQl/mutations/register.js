import gql from 'graphql-tag';

export default gql`
  mutation Register(
    $email: String!
    $password: String!
    $college: String!
    $name: String!
    $gender: String!
    $city: String!
    $phone: String!
  ) {
    signup(
      email: $email
      password: $password
      college: $college
      name: $name
      gender: $gender
      city: $city
      phone: $phone
    ) {
      code
      message
      success
      user {
        email
      }
    }
  }
`;
