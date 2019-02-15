import { graphql } from 'react-apollo'

import documentsFetch from 'src/graphql/DocumentsFetch.gql'

// Functions

export default graphql(documentsFetch, {
  name: 'documentsData',
  options: () => ({
    variables: {}
  })
})