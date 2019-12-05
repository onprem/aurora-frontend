import gql from 'graphql-tag';

export default gql`
  mutation forgotPassword($arIdOrEmail: String!) {
    forgotPassword(arIdOrEmail: $arIdOrEmail) {
      code
      message
      success
    }
  }
`;
