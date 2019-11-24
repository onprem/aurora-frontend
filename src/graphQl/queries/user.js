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
        event {
          id
          name
          fee
        }
        paymentStatus
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
