import { graphql } from 'react-apollo'

import companyFetch from 'src/graphql/CompanyFetch.gql'

// Functions

export default graphql(companyFetch, {
  name: 'companyData',
  options: () => ({
    variables: {}
  })
})