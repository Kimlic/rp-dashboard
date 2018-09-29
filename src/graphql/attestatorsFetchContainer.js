import { graphql } from 'react-apollo'

import attestatorsFetch from 'src/graphql/AttestatorsFetch.gql'

// Functions

export default graphql(attestatorsFetch, {
  name: 'attestatorsData',
  options: () => ({
    variables: {}
  })
})