import React, { Fragment } from 'react'

export default ({ location }) => (
  <Fragment>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </Fragment>
)