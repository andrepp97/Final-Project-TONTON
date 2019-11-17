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

// Import IMG //
import noData from "../../img/illustrations/no_data.svg"

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
            idUser: this.props.id
        }).then(res => {
            if (this._isMounted) {
                // GET LAST ADDED DATE //
                if (res.data.length > 0) {
                    this.setState({ lastAdded: res.data[0].created_date })
                }

                // WATCHLIST DATA //
                this.setState({
                    userWatchlist: res.data
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
            idUser: this.props.id,
            idMov
        }).then(res => {
            this.getWatchlistData()
            toast.error('Removed from Watchlist')
        }).catch(err => {
            console.log(err)
        })
    }
    // BUTTONS //

    // RENDER WATCHLIST //
    renderUserWatchlist = () => {
        return this.state.userWatchlist.map((val, idx) => {
            return (
                <tr key={idx} className='white-text'>
                    <td className='py-5 text-center font-weight-bold'>{idx+1}</td>
                    <td className='text-center'>
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
                    <td style={{paddingTop:'32px', textAlign:'center'}}>
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
        // REDIRECT TO HOME IF USER NOT LOGIN //
        if (this.props.username === '') {
            return <Redirect to='/home'></Redirect>
        }

        // DISPLAY WHEN THERE IS NO DATA //
        if (this.state.userWatchlist.length < 1) {
            return (
                <div className="main-backdrop page py-5">
                    <div className="container py-5 text-center">
                        <img src={noData} height="360px" alt="No Data"/>
                        <h5 className='white-text my-4'>You have no watchlist for now.</h5>
                        <Link to='/'>
                            <MDBBtn color='deep-purple' className='white-text'>
                                Discover Movies
                            </MDBBtn>
                        </Link>
                    </div>
                </div>
            )
        }

        // MAIN DISPLAY //
        return (
            <div className='page main-backdrop'>
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
                            {this.renderUserWatchlist()}
                        </MDBTableBody>
                    </MDBTable>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.user
}

export default connect(mapStateToProps, { navItemChange })(Watchlist)