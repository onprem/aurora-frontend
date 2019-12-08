import gql from 'graphql-tag';

export default gql`
  mutation SetTeamName($teamId: String!, $name: String!) {
    setTeamName(teamId: $teamId, arId: $name) {
      code
      message
      success
      team {
        id
        name
        members {
          name
          id
        }
        event {
          id
          name
          fee
          parentEvent
          maxSize
          isNameRequired
        }
        paymentStatus
        pendingInvitations {
          id
          name
        }
      }
    }
  }
`;
