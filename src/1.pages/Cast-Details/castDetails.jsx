import React, { Component } from 'react'
import moment from 'moment'
import Axios from 'axios'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { urlApi } from '../../3.helpers/database'
import { navItemChange } from '../../redux/1.actions'
import { MDBCardImage, MDBCard } from "mdbreact"
let Scroll = require('react-scroll')
let scroll = Scroll.animateScroll


class castDetails extends Component {
    _isMounted = false

    state = {
        castData : [],
        castMovies: []
    }


    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        scroll.scrollToTop()

        this.getCastData()
        this.getCastMovies()
        this.updateCastPopularity()
        this.props.navItemChange('CAST')
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //


    // GET DATA FROM API //
    getCastData = () => {
        const idCast = this.props.match.params.id
        Axios.post(urlApi + 'cast/castDetails', {
            idCast
        }).then((res) => {
            if (this._isMounted) {
                this.setState({ castData: res.data })
                console.log(res.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    getCastMovies = () => {
        const idCast = this.props.match.params.id
        Axios.post(urlApi + 'cast/castMovies', {
            idCast
        }).then((res) => {
            if (this._isMounted) {
                this.setState({ castMovies: res.data })
                console.log(res.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    updateCastPopularity = () => {
        const idCast = this.props.match.params.id
        if (this._isMounted) {
            Axios.post(urlApi + 'cast/updatePopularity', {
                idCast
            }).then((res) => {
                
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    // GET DATA FROM API //

    // RENDER CAST MOVIES //
    renderCastMovies = () => {
        if (this.state.castMovies !== [] && this.state.castMovies.length !== 0) {
            let jsx = this.state.castMovies.map(val => {
                return (
                    <div key={val.idMov} style={{ width: "11rem" }} className='card rounded mx-4 mb-4'>
                        <Link to={`/movie-details/${val.idMov}`} className='text-decoration-none text-dark'>
                            <img className="img-fluid rounded-top opacity-90" src={val.poster} alt={val.movieName} />
                            <h6 className='text-center font-weight-bold pt-2 px-1'>{val.movieName}</h6>
                        </Link>
                    </div>
                )
            })
            return jsx
        }
    }
    // RENDER CAST MOVIES //
    
    
    render() {
        return (
            <div className='page movie-backdrop2'>
                {/* Top Spacing Purpose */}
                <div className='mb-5'>&nbsp;</div>
                {/* Top Spacing Purpose */}

                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <MDBCard style={{ width:'18rem' }}>
                                <MDBCardImage
                                    src={this.state.castData.image}
                                    alt={this.state.castData.castName}
                                    className='img-fluid rounded'
                                />
                            </MDBCard>
                        </div>
                        <div className="col-lg-8 white-text">
                            <h2 className = 'border-bottom pb-3 mb-3 font-weight-bold'
                                style = {{letterSpacing:'1.5px'}}>
                                {this.state.castData.castName}
                            </h2>
                            <h6 className='my-3'><b>Birthday</b>
                                <span className='ml-3'>
                                    {moment(this.state.castData.birthday).format('MMMM DD, YYYY')}
                                </span>
                            </h6>
                            <h6><b>Gender</b>
                                <span className='ml-4'>
                                    {this.state.castData.gender}
                                </span>
                            </h6>
                            <p className='text-justify mt-3'>
                                {this.state.castData.bio}
                            </p>
                        </div>
                    </div>

                    {/* CAST MOVIES */}
                    <h3 className='mt-5 white-text text-center'>
                        <span className='text-white-50'>{this.state.castData.castName}</span>'s Movies
                    </h3>
                    <div className="row pt-4 justify-content-center border-bottom border-top">
                        {this.renderCastMovies()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { navItemChange }) (castDetails)