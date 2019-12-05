import gql from 'graphql-tag';

export default gql`
  mutation removeMember($teamId: String!, $arId: String!) {
    removeMember(teamId: $teamId, arId: $arId) {
      code
      message
      success
    }
  }
`;
