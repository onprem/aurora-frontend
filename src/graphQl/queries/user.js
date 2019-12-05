import gql from 'graphql-tag';

export default gql`
  query User {
    user {
      id
      name
      email
      phone
      gender
      city
      displayPic
      college
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
          parentEvent
          maxSize
        }
        paymentStatus
        pendingInvitations {
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
            id
            name
          }
        }
      }
    }
  }
`;
