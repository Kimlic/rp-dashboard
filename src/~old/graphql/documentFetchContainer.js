import { graphql } from 'react-apollo'

import query from 'src/graphql/DocumentFetch.gql'

// Functions

export default graphql(query, {
  name: 'documentData',
  options: props => {
    console.log("PROPS", props);
    
    return ({
      variables: {id: props.documentId}
    })
  }
})