// IMPORT LIBRARY //
import React, { Component } from 'react'
import { withRouter, Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import {keepLogin} from './redux/1.actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/slideTransition.scss'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
// IMPORT LIBRARY //

// IMPORT PAGES & COMPONENTS //
import LoadingScreen from './2.components/Loadings/loadingScreen'
import Navbar from './2.components/Navbar/Navbar'
import Home from './1.pages/Home/Home'
import Login from './1.pages/Login/Login'
import Signup from './1.pages/Signup/Signup'
import EmailVerification from './1.pages/EmailVerifying/EmailVerification'
import EmailVerified from './1.pages/EmailVerified/EmailVerified'
import Subscription from './1.pages/Subscription/Subscription'
import PaymentPage from './1.pages/Subscription/Payment'
import BillsPage from './1.pages/Subscription/MyBills'
import Watchlist from './1.pages/Watchlist/Watchlist'
import allMovies from './1.pages/Movies-All/allMovies'
import MovieDetails from './1.pages/Movie-Details/movieDetails'
import allCast from './1.pages/Cast-All/allCast'
import CastDetails from "./1.pages/Cast-Details/castDetails"
import PlayMovie from './1.pages/Play/Play'
import SearchResult from './1.pages/searchResult/SearchResult'
import AdminDashboard from './1.pages/Admin/adminDashboard'
import Footer from './2.components/Footer/Footer'
import PageNotFound from './1.pages/404'
// IMPORT PAGES & COMPONENTS //


class App extends Component {
  state = {
    prevDepth : this.getPathDepth(this.props.location)
  }

  getPathDepth(location) {
    let pathArr = location.pathname.split("/")
    pathArr = pathArr.filter(n => n !== '')
    return pathArr.length
  }


  // Lifecycle
  UNSAFE_componentWillMount() {
    this.setState({ prevDepth : this.getPathDepth(this.props.location) })
  }
  
  componentDidMount() {
    var token = localStorage.getItem('token')
    console.log(token)
    this.props.keepLogin(token)
  }
  // Lifecycle


  render() {
    const {location} = this.props
    const currentKey = location.pathname.split("/")[1] || "/"
    const timeout = { enter:650, exit:650 }

    if (!this.props.userObject.checker) {
      return <LoadingScreen/>
    }

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
                  <Route component={Home} path='/home' exact />
                  <Route component={Login} path='/login' exact />
                  <Route component={Signup} path='/signup' exact />
                  <Route component={EmailVerification} path='/emailverification' exact />
                  <Route component={EmailVerified} path='/emailverified' exact />
                  <Route component={Subscription} path='/subscription' exact />
                  <Route component={PaymentPage} path='/user-payment' exact />
                  <Route component={BillsPage} path='/my-bills' exact />
                  <Route component={Watchlist} path='/watchlist' exact />
                  <Route component={allMovies} path='/movies' exact />
                  <Route component={allCast} path='/cast' exact />
                  <Route component={CastDetails} path='/cast-details/:id' exact />
                  <Route component={MovieDetails} path='/movie-details/:id' exact />
                  <Route component={PlayMovie} path='/play/:idMov' exact />
                  <Route component={SearchResult} path='/searchResult' exact />
                  <Route component={AdminDashboard} path='/admin-dashboard' exact />
                  <Route component={PageNotFound} path='*' />
                </Switch>
              </div>
            </CSSTransition>
              <Footer/>
          </TransitionGroup>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    userObject: state.user
  }
}

export default withRouter(
  connect(mapStateToProps, { keepLogin })(App)
  )