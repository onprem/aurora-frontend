import gql from 'graphql-tag';

export default gql`
  query AllCA(
    $limit: Int
    $page: Int
    $sortBy: String
    $sortDir: Int
    $filterBy: String
    $pattern: String
  ) {
    allCA(
      limit: $limit
      page: $page
      sortBy: $sortBy
      sortDir: $sortDir
      filterBy: $filterBy
      pattern: $pattern
    ) {
      total
      ca {
        user {
          id
          name
          email
          phone
          gender
          city
          displayPic
          college
          isVerified
          accommodation
          pronite
          ca {
            isCA
            caId
            users {
              email
              phone
              college
              gender
              city
              displayPic
              college
              isVerified
              accommodation
              pronite
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
        paidUsers {
          id
          name
          email
          phone
          college
          gender
          city
          displayPic
          college
          isVerified
          accommodation
          pronite
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
  }
`;
