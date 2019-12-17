import gql from 'graphql-tag';

export default gql`
  query PublicUser($arId: String!) {
    publicUser(arId: $arId) {
      id
      name
    }
  }
`;
