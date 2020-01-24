import gql from 'graphql-tag';

export default gql`
  query AdminMetadata {
    adminMetadata {
      roles
      canViewUsers
      canEditUsers
      canViewEvents
      canViewOrders
      canEditOrders
      canViewAcc
      canEditAcc
      canViewPronites
      canEditPronites
      canViewCA
      canEditCA
      events {
        id
        name
        isNameRequired
      }
    }
  }
`;
