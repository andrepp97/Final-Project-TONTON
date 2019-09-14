import React, { Component } from 'react'
import { withRouter, Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import {keepLogin, cookieChecker} from './redux/1.actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/slideTransition.scss'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

// IMPORT PAGES
import Navbar from './2.components/Navbar/Navbar'
import Home from './1.pages/Home/Home'
import Login from './1.pages/Login/Login'
import Signup from './1.pages/Signup/Signup'
import Footer from './2.components/Footer/Footer';

// Cookie
import Cookie from 'universal-cookie'
let cookieObj = new Cookie()


class App extends Component {
  state = {
    prevDepth : this.getPathDepth(this.props.location)
  }

  getPathDepth(location) {
    let pathArr = location.pathname.split("/")
    pathArr = pathArr.filter(n => n !== '')
    return pathArr.length
  }

  componentWillReceiveProps() {
    this.setState({ prevDepth : this.getPathDepth(this.props.location) })
  }

  componentDidMount() {
    let cookieVar = cookieObj.get('userData')
    if (cookieVar) {
      this.props.keepLogin(cookieVar)
    } else {
      this.props.cookieChecker()
    }
  }


  render() {
    const {location} = this.props
    const currentKey = location.pathname.split("/")[1] || "/"
    const timeout = { enter:600, exit:500 }

    if (this.props.globalCookie) {
      return (
        <TransitionGroup className='App overflow-hidden' component='div'>
            <Navbar/>
            <CSSTransition 
              key={currentKey}
              timeout={timeout}
              classNames='pageSlide'
              mountOnEnter={false}
              unmountOnExit={true}
            >
            <div className={this.getPathDepth(location) - this.state.prevDepth >= 0 ? 'left' : 'right'} >
                <Switch location={location}>
                  <Route component={Home} path='/' exact />
                  <Route component={Login} path='/login' exact />
                  <Route component={Signup} path='/signup' exact />
                </Switch>
              </div>
            </CSSTransition>
              <Footer/>
          </TransitionGroup>
      )
    }
    return (
      <>
        <h3 className='text-center my-5'>Please Wait . . .</h3>
        <div className='d-flex justify-content-center my-3'>
            <div class="spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    globalCookie: state.user.cookie,
    userObject: state.user
  }
}

export default connect(mapStateToProps, { keepLogin, cookieChecker }) (withRouter(App))