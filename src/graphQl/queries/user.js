import gql from 'graphql-tag';

export default gql`
  query User {
    user {
      id
      name
      email
      phone
      teams {
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
        pendingInvitation {
          id
          name
        }
      }
      teamInvitations {
        invitedBy {
          id
          name
        }
        team {
          id
          event {
            name
          }
        }
      }
    }
  }
`;
