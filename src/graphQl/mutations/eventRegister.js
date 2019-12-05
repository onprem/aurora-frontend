import gql from 'graphql-tag';

export default gql`
  mutation eventRegister($eventId: Int!) {
    eventRegister(eventId: $eventId) {
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
