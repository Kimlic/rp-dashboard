import { createSelector } from 'reselect'

const authState = (state) => state.authReducer

export const currentUser = createSelector(authState, (state) => state.currentUser)

export const isAuthenticated = createSelector(authState, (state) => state.user !== null)

export const roles = createSelector(authState, (state) => state.roles)
