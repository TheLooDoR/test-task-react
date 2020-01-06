import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import './App.css';


function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
      <Switch>
        <ProtectedRoute
          exact
          path='/'
          component={Home}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(App);
