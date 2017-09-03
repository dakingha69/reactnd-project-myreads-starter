import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'
import Search from './components/Search'
import './index.css'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/search" component={Search}></Route>
    </div>
  </Router>, document.getElementById('root'))
