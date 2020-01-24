import gql from 'graphql-tag';

export default gql`
  mutation MakeCA($arId: String!) {
    makeCA(arId: $arId) {
      code
      message
      success
    }
  }
`;
