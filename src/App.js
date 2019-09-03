import React, { Component } from 'react'
import { withRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

// IMPORT PAGES
import Navbar from './2.components/Navbar/Navbar'
import Home from './1.pages/Home/Home'
import Login from './1.pages/Login/Login'
import Signup from './1.pages/Signup/Signup'
import Footer from './2.components/Footer/Footer';


class App extends Component {
  render() {
    return (
      <div style={{background:'#e5e5e5'}}>
        <Navbar/>
          <Switch>
            <Route component={Home} path='/' exact />
            <Route component={Login} path='/login' exact />
            <Route component={Signup} path='/signup' exact />
          </Switch>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(App)