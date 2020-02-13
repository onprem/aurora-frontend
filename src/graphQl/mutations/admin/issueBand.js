import gql from 'graphql-tag';

export default gql`
  mutation IssueBand($arId: String!) {
    issueBand(arId: $arId) {
      code
      message
      success
    }
  }
`;
