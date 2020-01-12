import gql from 'graphql-tag';

export default gql`
  mutation AlphaRegister(
    $email: String!
    $passcode: String!
    $college: String!
    $name: String!
    $gender: String!
    $city: String!
    $phone: String!
  ) {
    alphaSignup(
      email: $email
      passcode: $passcode
      college: $college
      name: $name
      gender: $gender
      city: $city
      phone: $phone
    )
  }
`;
