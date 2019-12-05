import gql from 'graphql-tag';

export default gql`
  mutation leaveTeam($teamId: String!) {
    leaveTeam(teamId: $teamId) {
      code
      message
      success
    }
  }
`;
