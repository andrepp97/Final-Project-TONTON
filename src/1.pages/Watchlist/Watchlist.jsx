import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import Scroll from 'react-scroll'
import moment from 'moment'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { urlApi } from '../../3.helpers/database'
import { navItemChange } from '../../redux/1.actions'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdbreact'

let scroll = Scroll.animateScroll


class Watchlist extends Component {
    _isMounted = false

    state = {
        userWatchlist: [],
        lastAdded: null
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        scroll.scrollToTop()

        this.getWatchlistData()
        this.props.navItemChange('WATCHLIST')
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    // GET DATA //
    getWatchlistData = () => {
        Axios.post(urlApi + 'watchlist/getUserWatchlist', {
            idUser: this.props.userObject.id
        }).then(res => {
            if (this._isMounted) {
                this.setState({
                    userWatchlist: res.data,
                    lastAdded: res.data[0].created_date
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    // GET DATA //

    // BUTTONS //
    removeFromWatchlist = (idMov) => {
        Axios.post(urlApi + 'watchlist/removeFromWatchlist', {
            idUser: this.props.userObject.id,
            idMov
        }).then(res => {
            toast.error('Removed from Watchlist')
            this.getWatchlistData()
        }).catch(err => {
            console.log(err)
        })
    }
    // BUTTONS //

    // RENDER WATCHLIST //
    renderUserWatchlist = () => {
        return this.state.userWatchlist.map((val, idx) => {
            return (
                <tr key={idx} className='text-center white-text'>
                    <td className='py-5'>{idx+1}</td>
                    <td>
                        <Link to={`/movie-details/${val.idMov}`} className='text-decoration-none white-text'>
                            <img
                                src={val.poster}
                                alt={val.movieName}
                                className='rounded shadow'
                                width='56px'
                            />
                        </Link>
                    </td>
                    <td className='py-5'>
                        <Link to={`/movie-details/${val.idMov}`} className='text-decoration-none white-text'>
                            <h6 className='font-weight-bold' style={{letterSpacing:'1px'}}>
                                {val.movieName}
                            </h6>
                        </Link>
                    </td>
                    <td style={{paddingTop:'32px'}}>
                        <MDBBtn color='red'
                                className='white-text'
                                data-tip='Remove from Watchlist'
                                onClick={() => this.removeFromWatchlist(val.idMov)}
                        >
                            <MDBIcon icon="trash" />
                        </MDBBtn>
                        <ReactTooltip place="top" />
                    </td>
                </tr>
            )
        })
    }
    // RENDER WATCHLIST //

    
    render() {
        if (this.props.userObject.username === '' && this.props.userObject.role === '') {
            return <Redirect to='/home'></Redirect>
        }

        return (
            <div className='wallpaper2 page'>
                {/* Top Spacing Purpose */}
                <div className='mb-5'>&nbsp;</div>
                {/* Top Spacing Purpose */}

                {/* TOAST CONTAINER */}
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
                {/* TOAST CONTAINER */}

                <div className="container py-5">
                    {/* Watch List Header */}
                    <div className='white-text text-center mb-4'>
                        <h3>Watch List</h3>
                        {this.state.userWatchlist.length} Movies
                        <MDBIcon icon="circle" className='mx-3' style={{fontSize:'10px'}} />
                        {
                            this.state.userWatchlist.length > 0
                            ?
                            <span>
                                Last Added {moment(this.state.lastAdded).fromNow()}
                            </span>
                            :
                            null
                        }
                    </div>
                    {/* Watch List Header */}

                    <MDBTable hover responsive>
                        <MDBTableHead color='deep-purple' textWhite>
                            <tr className='text-center'>
                                <th>#</th>
                                <th>Poster</th>
                                <th>Movie Title</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                this.state.userWatchlist.length < 1
                                    ?
                                    <tr>
                                        <td colSpan='4' className='text-center white-text bg-danger py-4'>
                                            You have no Watchlist.
                                        </td>
                                    </tr>
                                    :
                                    this.renderUserWatchlist()
                            }
                        </MDBTableBody>
                    </MDBTable>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userObject: state.user
    }
}

export default connect(mapStateToProps, { navItemChange })(Watchlist)