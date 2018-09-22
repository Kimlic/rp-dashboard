import React from 'react'
import { compose } from 'react-apollo'

import companyFetchContainer from 'src/graphql/companyFetchContainer'
import companyUpdateContainer from 'src/graphql/companyUpdateContainer'

import UI from './UI'

// Component

export default compose(companyFetchContainer, companyUpdateContainer) (({ companyData: { loading, company }, companyUpdate}) => {
  let onChange = (company) => ({ target: { name, value } }) => companyUpdate({ ...company, [name]: value })
  onChange = onChange(company)

  const loader = <div>Loading...</div>
  const companyDetails = <UI company={company} onChange={onChange} />

  return (loading ? loader : companyDetails)
})