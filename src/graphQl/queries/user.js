import gql from 'graphql-tag';

export default gql`
  query User {
    user {
      id
      name
      email
      phone
      college
      displayPic
      gender
      city
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
