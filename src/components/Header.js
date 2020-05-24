import React from 'react'
import { Link } from 'react-router-dom'
import UserSignInOut from './UserSignInOut'

const Header = ({ children }) => {
  return (
    <div className='header'>
      <div className='nav'>
        <div className='nav_links'>
          <Link to='/'>Home</Link>
          <Link to='/write'>Write</Link>
          <Link to='/archive'>Archive</Link>
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
