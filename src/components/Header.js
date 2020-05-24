import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserSignInOut from './UserSignInOut'
import { UserContext } from '../contexts'

const Header = ({ children }) => {
  const { user } = useContext(UserContext)

  return (
    <div className='header'>
      <div className='nav'>
        <div className='nav_links'>
          <span className='font-bold font-mono text-indigo-600 mr-5'>kasten.app</span>
          {
            user
              ? (
                <>
                  <Link to='/'>Home</Link>
                  <Link to='/write'>Write</Link>
                  <Link to='/archive'>Archive</Link>
                </>
              ) : ''
          }
        </div>
        <div className='nav_actions'>
          {children}
          <UserSignInOut />
        </div>
      </div>
    </div>
  )
}

export default Header
