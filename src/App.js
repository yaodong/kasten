import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Archive from './pages/Archive';
import UserSignInOut from './components/UserSignInOut';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/archive">Archive</Link>
            </li>
            <li>
              <UserSignInOut />
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/archive">
            <Archive />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
