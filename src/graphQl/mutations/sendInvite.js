import gql from 'graphql-tag';

export default gql`
  mutation sendInvite($teamId: String!, $arId: String!) {
    sendInvite(teamId: $teamId, arId: $arId) {
      code
      message
      success
    }
  }
`;
