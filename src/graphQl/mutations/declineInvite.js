import gql from 'graphql-tag';

export default gql`
  mutation DeclineInvite($teamId: String!) {
    declineInvite(teamId: $teamId) {
      code
      message
      success
    }
  }
`;
