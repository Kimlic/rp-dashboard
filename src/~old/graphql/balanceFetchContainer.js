import { graphql } from 'react-apollo'

import balanceFetch from 'src/graphql/BalanceFetch.gql'

// Functions

export default graphql(balanceFetch, {
  name: 'balanceData',
  options: () => ({
    variables: {}
  })
})