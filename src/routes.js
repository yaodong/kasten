import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from './contexts'

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  const { user } = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to='/' />}
    />
  )
}

export default ProtectedRoute
