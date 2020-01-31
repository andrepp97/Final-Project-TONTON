import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { MDBBadge } from 'mdbreact'
import { urlApi } from '../../3.helpers/database'
import { navItemChange, calcUserSubs } from '../../redux/1.actions'
import Jumbotron from '../../2.components/Jumbotron/Jumbotron'
import Carousel from '../../2.components/Carousel/Carousel'
import Scroll from 'react-scroll'

let scroll = Scroll.animateScroll


class Home extends Component {
    _isMounted = false

    state = {
        moviePoster : [],
        moviePosterNew : []
    }


    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        scroll.scrollToTop()

        // REDUX ACTIONS //
        this.props.calcUserSubs(this.props.id)
        this.props.navItemChange('DISCOVER')
        // REDUX ACTIONS //

        
        this.getMoviePosterPopular()
        this.getMoviePosterNew()
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //


    // GET MOVIE POSTER
    getMoviePosterPopular = () => {
        Axios.post(urlApi + 'movie/moviePosterPopular')
            .then((res) => {
                if (this._isMounted) {
                    console.log(res.data)
                    this.setState({ moviePoster: res.data })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getMoviePosterNew = () => {
        Axios.post(urlApi + 'movie/moviePosterNew')
            .then((res) => {
                if (this._isMounted) {
                    console.log(res.data)
                    this.setState({ moviePosterNew: res.data })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // GET MOVIE POSTER

    
    render() {
        return (
            <div className='page main-backdrop pb-5 white-text'>
                <Jumbotron />
                
                {/* Popular Movies */}
                <div className="container-fluid mt-4 mb-n1">
                    <h4 className='ml-4'>
                        Popular &nbsp;
                        <Link to='/movies' className='font-small text-decoration-none'>
                            <MDBBadge color='deep-purple'>See More</MDBBadge>
                        </Link>
                    </h4>
                </div>
                {
                    this.state.moviePoster
                    ?
                        <Carousel moviePoster={this.state.moviePoster} />
                    :
                        null
                }

                {/* New Uploads */}
                <div className="container-fluid mt-5 mb-n1">
                    <h4 className='ml-4'>
                        New on TONTON &nbsp;
                        <Link to='/movies' className='font-small text-decoration-none'>
                            <MDBBadge color='deep-purple'>See More</MDBBadge>
                        </Link>
                    </h4>
                </div>
                {
                    this.state.moviePosterNew ?
                        <Carousel moviePoster={this.state.moviePosterNew} />
                        :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.user
}


export default connect(mapStateToProps, { navItemChange, calcUserSubs })(Home)