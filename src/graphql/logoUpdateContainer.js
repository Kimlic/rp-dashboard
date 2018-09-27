import { graphql } from 'react-apollo'

import logoUpdate from 'src/graphql/LogoUpdate.gql'
import logoFetch from 'src/graphql/LogoFetch.gql'

// Functions

export default graphql(logoUpdate, {
  props: ({ mutate }) => ({
    logoUpdate: (variables) => {
      return mutate({ 
        variables,
        refetchQueries: [{
          query: logoFetch,
          variables: {},
        }]
      })
    }
  })
})