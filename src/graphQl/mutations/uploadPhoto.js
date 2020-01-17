import gql from 'graphql-tag';

export default gql`
  mutation uploadPhoto($photo: Upload!) {
    uploadPhoto(photo: $photo) {
      code
      success
      message
      user {
        displayPic
      }
    }
  }
`;
