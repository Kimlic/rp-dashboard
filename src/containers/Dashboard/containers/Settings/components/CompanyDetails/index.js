import React from 'react'
import { compose } from 'react-apollo'

import companyFetchContainer from 'src/graphql/companyFetchContainer'
import companyUpdateContainer from 'src/graphql/companyUpdateContainer'
import uploadLogoContainer from 'src/graphql/uploadLogoContainer'

import UI from './UI'

// Component

export default compose(companyFetchContainer, companyUpdateContainer, uploadLogoContainer) (
  ({ companyData: { loading, company }, companyUpdate, uploadLogo }) => {
    let onChange = (company) => ({ target: { name, value } }) => companyUpdate({ ...company, [name]: value })
    onChange = onChange(company)

    const loader = <div>Loading...</div>
    const companyDetails = <UI company={company} onChange={onChange} onLogoChange={uploadLogo} />

    return (loading ? loader : companyDetails)
  }
)