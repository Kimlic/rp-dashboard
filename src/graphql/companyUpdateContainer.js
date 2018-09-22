import { graphql } from 'react-apollo'

import companyUpdate from 'src/graphql/CompanyUpdate.gql'
import companyFetch from 'src/graphql/CompanyFetch.gql'

// Functions

export default graphql(companyUpdate, {
  props: ({ mutate }) => ({
    companyUpdate: (variables) => mutate({
      variables,
      refetchQueries: [{
        query: companyFetch,
        variables: {},
      }],
      optimisticResponse: {
        companyUpdate: {
          ...variables,
          __typename: 'Company'
        }
      }
    })
  })
})