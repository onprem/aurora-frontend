import gql from 'graphql-tag';

export default gql`
  mutation editProfile($name: String!, $college: String!, $city: String!, $phone: String!) {
    updateProfile(name: $name, college: $college, city: $city, phone: $phone) {
      code
      message
      success
      user {
        email
      }
    }
  }
`;
