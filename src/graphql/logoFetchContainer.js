import { graphql } from 'react-apollo'

import logoFetch from 'src/graphql/LogoFetch.gql'

// Functions

export default graphql(logoFetch, {
  name: 'logoData',
  options: () => ({
    variables: {}
  })
})