import gql from 'graphql-tag';

export default gql`
  query UserDetails($arId: String!) {
    userDetails(arId: $arId) {
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
      ca {
        isCA
        caId
        users {
          id
          name
        }
      }
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
