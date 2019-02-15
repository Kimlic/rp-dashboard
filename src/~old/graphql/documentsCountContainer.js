import { graphql } from 'react-apollo'

import documentsCount from 'src/graphql/DocumentsCount.gql'

// Functions

export default graphql(documentsCount, {
  name: 'countDocumentsData',
  options: () => ({
    variables: {}
  })
})