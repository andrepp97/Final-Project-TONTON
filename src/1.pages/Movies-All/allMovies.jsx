import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { urlApi } from '../../3.helpers/database'
import { navItemChange } from '../../redux/1.actions'
import Carousel from '../../2.components/Carousel/Carousel'
let Scroll = require('react-scroll')
let scroll = Scroll.animateScroll


class allMovies extends Component {
    _isMounted = false

    state = {
        moviePoster: [],
        moviePosterNew: []
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        scroll.scrollToTop()
        
        this.getMoviePosterNew()
        this.getMoviePoster()
        this.props.navItemChange('MOVIES')
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //
    

    // GET POSTER //
    getMoviePoster = () => {
        Axios.get(urlApi + 'movie/moviePoster')
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
        Axios.get(urlApi + 'movie/moviePosterNew')
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
    // GET POSTER //

    // RENDERS //
    renderAllMovies = () => {
        let jsx = this.state.moviePoster.map(val => {
            return (
                <Link to={`/movie-details/${val.id}`} key={val.id}
                    className='card rounded text-decoration-none bg-transparent m-3'
                    style={{ width:'170px' }}>
                    <img src={val.poster} className='rounded' width='170px' height='250px' alt={`[POSTER] ${val.movieName}`} />
                        {
                            val.type === 'F'
                            ?
                                <span className='badge-dark text-center mt-n2 rounded-bottom' style={{ width: '170px', letterSpacing: '2px', fontSize: '11px', fontWeight: 'bold' }}>
                                    FREE
                                </span>
                            :
                                <span className='btn-purple text-center mt-n2 rounded-bottom' style={{ width: '170px', letterSpacing: '2px', fontSize: '11px', fontWeight: 'bold' }}>
                                    PREMIUM
                                </span>
                        }
                        
                </Link>
            )
        })
        return jsx
    }
    // RENDERS //


    render() {
        return (
            <div className='page movie-backdrop2'>
                {/* Top Spacing Purpose */}
                <h1 className='mb-5'>&nbsp;</h1>
                {/* Top Spacing Purpose */}

                {/* New Uploads */}
                <div className='py-3'>
                    <div className="container-fluid mb-n1">
                        <h4 className='ml-4 pb-2 white-text text-center text-uppercase'>
                            Latest Uploads
                        </h4>
                    </div>
                    <div className='border-bottom border-top'>
                        {
                            this._isMounted
                        ?
                            <Carousel moviePoster={this.state.moviePosterNew} />
                        :
                            null
                        }
                    </div>
                </div>
                {/* New Uploads */}

                <div className="container-fluid p-5">
                    <div className="row justify-content-center">
                        {this.renderAllMovies()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { navItemChange })(allMovies)