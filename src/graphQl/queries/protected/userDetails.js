import gql from 'graphql-tag';

export default gql`
  query UserDetails($arId: String!) {
    userDetails(arId: $arId) {
      bandType
      issuedBandType
      isBandIssued
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
        isVerified
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
        }
      }
    }
  }
`;
