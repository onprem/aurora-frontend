import gql from 'graphql-tag';

export default gql`
  mutation SetCA($id: String!) {
    setCA(id: $id) {
      code
      message
      user {
        ca {
          caId
        }
      }
    }
  }
`;
