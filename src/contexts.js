import React, { createContext, useState, useContext, useEffect } from 'react'
import firebaseService from './firebase'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const localAuth = window.localStorage.getItem('user')
    setUser(localAuth ? JSON.parse(localAuth) : null)
    setReady(true)
  }, [setUser])

  return ready
    ? (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    )
    : <div />
}

export const FirebaseContext = createContext(null)

export const FirebaseProvider = ({ children }) => {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    firebaseService.auth().onAuthStateChanged((auth) => {
      const user = auth ? {
        id: auth.uid,
        name: auth.displayName
      } : null
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    })
  }, [setUser])

  return (
    <FirebaseContext.Provider value={firebaseService}>
      {children}
    </FirebaseContext.Provider>
  )
}
