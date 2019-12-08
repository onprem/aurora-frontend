import gql from 'graphql-tag';

export default gql`
  mutation AcceptInvite($teamId: String!) {
    acceptInvite(teamId: $teamId) {
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
