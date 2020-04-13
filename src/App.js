import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Timeline from './components/Timeline'
import About from './components/About'
import Login from './components/Login';
import Register from './components/Register'

export default function App() {
  return (
    <Router>
      <div>
          <Route exact path="/" component={Timeline}/>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} /> 
          
      </div>
      </Router>
  );
}

