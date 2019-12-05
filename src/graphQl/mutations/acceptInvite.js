import gql from 'graphql-tag';

export default gql`
  mutation AcceptInvite($teamId: String!) {
    acceptInvite(teamId: $teamId) {
      code
      message
      success
      team {
        id
        event {
          id
          name
          fee
          parentEvent
          maxSize
        }
        members {
          name
          id
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
