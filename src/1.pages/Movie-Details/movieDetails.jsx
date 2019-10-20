import React, { Component } from 'react'
import moment from 'moment'
import Axios from 'axios'
import windowSize from 'react-window-size'
import Scroll from 'react-scroll'
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { MDBBtn, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact'

import { urlApi } from '../../3.helpers/database'
import { navItemChange } from '../../redux/1.actions'

let scroll = Scroll.animateScroll


class movieDetails extends Component {
    _isMounted = false
    idMov = this.props.match.params.id

    state = {
        movieData: [],
        movieGenre: '',
        movieCast: [],
        showTrailer: false,
        watchlist: false
    }


    // LIFECYCLE //
    componentDidMount(){
        this._isMounted = true
        scroll.scrollToTop()
        
        this.getMovieData()
        this.checkWatchlist()
        this.props.navItemChange('MOVIES')
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //


    // GET DATA //
    getMovieData = () => {
        Axios.post(urlApi + 'movie/movies', {
            idMov: this.idMov
        }).then((res) => {
            if (this._isMounted) {
                this.setState({ movieData: res.data[0] })
                // Get Movie Genre
                Axios.post(urlApi + 'movie/getGenre/', {
                    idMov: this.idMov
                }).then((res) => {
                    this.setState({ movieGenre: res.data })
                }).catch((err) => {
                    console.log(err)
                })
                // Get Movie Cast
                Axios.post(urlApi + 'cast/movieCast', {
                    idMov: this.idMov
                })
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ movieCast: res.data })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    // GET DATA //

    // RENDERS //
    renderMovieCast = () => {
        if (this.state.movieCast !== [] && this.state.movieCast.length !== 0) {
            let jsx = this.state.movieCast.map(val => {
                return (
                    <div key={val.idCast} style={{ width: "11rem" }} className='card rounded mx-4 mb-4'>
                        <Link to={`/cast-details/${val.idCast}`} className='text-decoration-none text-dark'>
                            <img className="img-fluid rounded-top opacity-90" src={val.image} alt={val.castName} />
                            <h6 className='text-center font-weight-bold pt-2 px-1'>{val.castName}</h6>
                        </Link>
                    </div>
                )
            })
            return jsx
        }
    }
    // RENDERS //

    // WATCHLIST //
    checkWatchlist = () => {
        if (this._isMounted) {
            Axios.post(urlApi + 'watchlist/checkWatchlist', {
                idUser: this.props.userObject.id,
                idMov: this.idMov
            }).then(res => {
                if (res.data.length > 0) {
                    this.setState({ watchlist: true })
                } else {
                    this.setState({ watchlist: false })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    addToWatchlist = () => {
        Axios.post(urlApi + 'watchlist/addToWatchlist', {
            idUser: this.props.userObject.id,
            idMov: this.idMov
        }).then(res => {
            toast('Added to Watchlist')
            this.checkWatchlist()
        }).catch(err => {
            console.log(err)
        })
    }

    removeFromWatchlist = () => {
        Axios.post(urlApi + 'watchlist/removeFromWatchlist', {
            idUser: this.props.userObject.id,
            idMov: this.idMov
        }).then(res => {
            toast.error('Removed from Watchlist')
            this.checkWatchlist()
        }).catch(err => {
            console.log(err)
        })
    }
    // WATCHLIST //
    

    render() {
        return (
            <div className='page movie-backdrop2'>
                {/* Top Spacing Purpose */}
                <div className='mb-5'>&nbsp;</div>
                {/* Top Spacing Purpose */}

                {/* TOASTIFY & ToolTip CONTAINER */}
                <ReactTooltip place="top" type="dark" />
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    pauseOnHover={false}
                    closeButton={false}
                    transition={Flip}
                    closeOnClick
                    draggable
                />
                {/* TOASTIFY & ToolTip CONTAINER */}

                {/* MAIN CONTENT */}
                <div className='container py-5'>
                    <div className="row">
                        <div className={ this.props.windowWidth < 975 ? "col-lg-12 text-center" : "col-lg-4" }>
                            <img src={this.state.movieData.poster}
                                className='rounded mb-3'
                                height='450px'
                                width='300px'
                                alt="movie-poster"
                            />
                        </div>
                        <div className="col-lg-8">
                            {/* MOVIE TITLE */}
                            <h3 className='white-text border-bottom pb-3 mb-4 font-weight-bold' style={{ letterSpacing: '1px' }}>
                                {this.state.movieData.movieName}
                                <span className='d-inline text-white-50 ml-2 font-small' style={{fontSize:'20px'}}>
                                    {'(' + moment(this.state.movieData.releaseDate).format('YYYY') + ')'}
                                </span>
                            </h3>
                            {/* MOVIE TITLE */}
                            <MDBIcon size='lg' icon="stopwatch" className='text-white-50' />
                                <p className='d-inline white-text ml-1' style={{letterSpacing:'1px'}}>
                                    {this.state.movieData.duration}
                                </p>
                            <MDBIcon icon="volume-up" className='text-white-50 ml-4' />
                                <p className='d-inline white-text ml-1'>
                                    {this.state.movieData.lang}
                                </p>
                            <MDBIcon icon="flag" className='text-white-50 ml-4' />
                                <p className='d-inline white-text ml-1'>
                                    {this.state.movieData.country}
                                </p>

                            <p className='font-weight-bold white-text mt-4'>Genre
                                <span className='font-weight-normal' style={{marginLeft:'2rem'}}>
                                    {this.state.movieGenre}
                                </span>
                            </p>
                            <p className='font-weight-bold white-text mb-4'>Director
                                <span className='font-weight-normal' style={{marginLeft:'1rem'}}>
                                    {this.state.movieData.director}
                                </span>
                            </p>

                        {/* BUTTONS */}
                            {
                                this.props.userObject.username === ''
                                ?
                                <Link to='/login' style={{outline:'none'}}>
                                    <MDBBtn color='deep-purple'
                                            className='white-text font-weight-bold px-4 py-2 ml-auto rounded'
                                            style={{letterSpacing:'1px'}}
                                    >
                                        <MDBIcon icon="play" /><span className='ml-2'>Login To Enjoy</span>
                                    </MDBBtn>
                                </Link>
                                :
                                <Link to={`/play/${this.props.match.params.id}`} style={{outline:'none'}}>
                                    <MDBBtn color='deep-purple'
                                            className='white-text font-weight-bold px-4 py-2 ml-auto rounded'
                                            style={{ letterSpacing: '1px' }}
                                    >
                                        <MDBIcon icon="play" /><span className='ml-2'>Play</span>
                                    </MDBBtn>
                                </Link>
                            }

                            <MDBBtn color='elegant'
                                    className='white-text font-weight-bold px-4 py-2 mx-3 rounded'
                                    style={{letterSpacing:'1px'}}
                                    onClick={() => this.setState({ showTrailer: true })}
                            >
                                <MDBIcon icon="film" /><span className='ml-2'>Trailer</span>
                            </MDBBtn>
                            
                            
                                {
                                    this.props.userObject.username === ''
                                    ?
                                    <Link to='/login'>
                                        <MDBBtn
                                            color='elegant'
                                            className='white-text rounded-circle px-3 py-2'
                                            data-tip='Login to add this movie to your Watchlist'
                                        >
                                            <MDBIcon far icon="bookmark" />
                                        </MDBBtn>
                                    </Link>
                                    :
                                    (this.state.watchlist)
                                    ?
                                        <MDBBtn
                                            color='elegant'
                                            className='white-text rounded-circle px-3 py-2'
                                            data-tip='This movie is in your watchlist'
                                            onClick={this.removeFromWatchlist}
                                        >
                                            <MDBIcon icon="bookmark" />
                                        </MDBBtn>
                                    :
                                        <MDBBtn
                                            color='elegant'
                                            className='white-text rounded-circle px-3 py-2'
                                            data-tip='Add this movie to Watchlist'
                                            onClick={this.addToWatchlist}
                                        >
                                            <MDBIcon far icon="bookmark" />
                                        </MDBBtn>
                                }
                            
                        {/* BUTTONS */}

                            <p className='white-text my-4 text-justify'>
                                {this.state.movieData.synopsis}
                            </p>
                            
                            {/* Modal */}
                            {this.state.showTrailer ?
                                <MDBModal isOpen={this.state.showTrailer} toggle={() => this.setState({ showTrailer: false })} centered size="lg">
                                    <MDBModalHeader toggle={() => this.setState({ showTrailer: false })}>
                                        {this.state.movieData.movieName} Trailer
                                    </MDBModalHeader>
                                    <MDBModalBody className='p-0'>
                                        <iframe title="Trailer"
                                                width={ this.props.windowWidth < 975 ? 500 : 800 }
                                                height={450}
                                                src={this.state.movieData.trailer}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen="allowFullScreen">
                                        </iframe>
                                    </MDBModalBody>
                                </MDBModal>
                            : null}
                        </div>
                    </div>


                    {/* MOVIE CAST */}
                    <h2 className='mt-5 white-text text-center'>Top Cast</h2>
                    <div className="row pt-4 justify-content-center border-bottom border-top">
                        { this.renderMovieCast() }
                    </div>
                </div>
                {/* MAIN CONTENT */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userObject: state.user
    }
}

export default connect(mapStateToProps, { navItemChange }) (windowSize(movieDetails))