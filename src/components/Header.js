import React from 'react';
import { Link } from 'react-router-dom';
import UserSignInOut from './UserSignInOut';
import { useLocation } from 'react-router-dom';

const Header = () => {
  let location = useLocation();

  return (
    <div className="header">
      <div className="container mx-auto">
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/write">Write</Link>
          <Link to="/archive">Archive</Link>
          <UserSignInOut />
        </div>
      </div>
    </div>
  );
};

export default Header;
