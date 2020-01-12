import gql from 'graphql-tag';

export default gql`
  query User {
    user {
      id
      name
      email
      phone
      pronite
      gender
      city
      displayPic
      accommodation
      college
      teams {
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
