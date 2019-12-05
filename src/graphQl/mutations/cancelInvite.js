import gql from 'graphql-tag';

export default gql`
  mutation CancelInvite($teamId: String!, $arId: String!) {
    cancelInvite(teamId: $teamId, arId: $arId) {
      code
      message
      success
      team {
        id
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
