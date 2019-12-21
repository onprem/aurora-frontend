import gql from 'graphql-tag';

export default gql`
  mutation MakeEventAdmin($arId: String!, $eventIds: [Int!]!) {
    makeEventAdmin(arId: $arId, eventIds: $eventIds) {
      code
      message
      success
    }
  }
`;
