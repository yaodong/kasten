import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './routes'
import HomePage from './pages/Home'
import ArchivePage from './pages/Archive'
import WritePage from './pages/Write'
import ReadPage from './pages/Read'

function App () {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path='/write/:id?' component={WritePage} />
        <ProtectedRoute path='/archive' component={ArchivePage} />
        <ProtectedRoute path='/read/:id' component={ReadPage} />
        <Route path='/'><HomePage /></Route>
      </Switch>
    </Router>
  )
}

export default App
