import { graphql } from 'react-apollo'

import logoUpdate from 'src/graphql/LogoUpdate.gql'
import companyFetch from 'src/graphql/CompanyFetch.gql'

// Functions

export default graphql(logoUpdate, {
  props: ({ mutate }) => ({
    logoUpdate: (variables) => {
      return mutate({ 
        variables
        // refetchQueries: [{
        //   query: companyFetch,
        //   variables: {},
        // }],
        // optimisticResponse: {
        //   uploadLogo: {
        //     ...variables,
        //     __typename: 'String'
        //   }
        // }
      })
    }
  })
})