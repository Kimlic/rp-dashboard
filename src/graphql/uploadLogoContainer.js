import { graphql } from 'react-apollo'

import uploadLogo from 'src/graphql/UploadLogo.gql'
import companyFetch from 'src/graphql/CompanyFetch.gql'

// Functions

export default graphql(uploadLogo, {
  props: ({ mutate }) => ({
    uploadLogo: (variables) => {
      console.log("AAAAAA", variables);
      const res = mutate({ 
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
      console.log("BBBBBB", res);

      return res
    }
  })
})