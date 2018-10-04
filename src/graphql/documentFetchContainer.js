import { graphql } from 'react-apollo'

import documentFetch from 'src/graphql/DocumentFetch.gql'

// Functions

export default graphql(documentFetch, {
  name: 'documentData',
  options: () => ({
    variables: {
      id: '0e6045e2-d5aa-4200-82d8-2f6a55423176'
    }
  })
})