import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './routes'
import HomePage from './pages/Home';
import ArchivePage from './pages/Archive';
import WritePage from './pages/Write';

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/write" component={WritePage} />
        <ProtectedRoute path="/archive" component={ArchivePage} />
        <Route path="/"><HomePage /></Route>
      </Switch>
    </Router>
  );
}

export default App;
