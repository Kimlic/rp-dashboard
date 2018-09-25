import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from "react-apollo"
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from '@richeterre/apollo-upload-client'

import { AUTH_TOKEN } from 'src/constants/auth'
import { store } from 'src/store'
import registerServiceWorker from 'src/utils/registerServiceWorker'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

import Dashboard from 'src/containers/Dashboard'
import SignIn from 'src/containers/SignIn'
import Support from 'src/containers/Support'
import NoMatch from 'src/containers/NoMatch'

// Component

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// const link = createAbsintheSocketLink(AbsintheSocket.create(
//   new PhoenixSocket('ws://localhost:4000/socket/websocket?vsn=1.0.0', { params: { token: yourToken} }),
//  ))

const client = new ApolloClient({
  link: authLink
    .concat(new createUploadLink({ uri: process.env.API_URI })),
  cache: new InMemoryCache()
})

const handleRouteChange = () => {
  if (this.state.location !== 'POP') window.scrollTo(0, 0)
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter onUpdate={handleRouteChange}>
      <ApolloProvider client={client}>
        <Switch>
          <Redirect exact path="/" to="/dashboard" />
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/support" component={Support} />
          <Route component={NoMatch} />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))

registerServiceWorker()
