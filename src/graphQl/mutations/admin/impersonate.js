import gql from 'graphql-tag';

export default gql`
  mutation Impersonate($arId: String!) {
    impersonate(arId: $arId)
  }
`;
