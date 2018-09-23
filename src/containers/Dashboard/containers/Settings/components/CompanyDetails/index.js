import React from 'react'
import { compose } from 'react-apollo'

import companyFetchContainer from 'src/graphql/companyFetchContainer'
import companyUpdateContainer from 'src/graphql/companyUpdateContainer'
import logoFetchContainer from 'src/graphql/logoFetchContainer'
import logoUpdateContainer from 'src/graphql/logoUpdateContainer'

import UI from './UI'

// Component

export default compose(companyFetchContainer, companyUpdateContainer, logoFetchContainer, logoUpdateContainer) (
  ({ companyData, logoData, companyUpdate, logoUpdate }) => {
    const { loading: loadingCompany, company } = companyData
    const { loading: loadingLogo, logo } = logoData

    let onChange = (company) => ({ target: { name, value } }) => companyUpdate({ ...company, [name]: value })
    onChange = onChange(company)

    const loader = <div>Loading...</div>
    const companyDetails = <UI company={company} logo={logo} onChange={onChange} onLogoChange={logoUpdate} />

    return (loadingCompany || loadingLogo ? loader : companyDetails)
  }
)