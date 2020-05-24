import React, { useContext, useCallback } from 'react'
import { UserContext, FirebaseContext } from '../contexts'

const UserSignInOut = () => {
  const { user } = useContext(UserContext)
  const firebase = useContext(FirebaseContext)

  const signIn = useCallback(async () => {
    await firebase.signIn()
  }, [firebase])

  const signOut = useCallback(async () => {
    await firebase.signOut()
  }, [firebase])

  return user
    ? (
      <button onClick={signOut}>
        Sign Out
      </button>
    ) : (
      <button onClick={signIn}>
        Sign In with Google
      </button>
    )
}

export default UserSignInOut
