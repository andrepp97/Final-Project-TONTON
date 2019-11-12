import React, { Component } from 'react';
import qs from 'query-string'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'
import { Link } from "react-router-dom"
import { urlApi } from "../../3.helpers/database"
import LoadingScreen from '../../2.components/Loadings/loadingScreen'

// IMPORT IMG //
import NoResults from '../../img/illustrations/no_data.svg'
// IMPORT IMG //


class SearchResult extends Component {
    // LOCAL VARIABLES //
    _isMounted = false
    searchVal: ''
    // LOCAL VARIABLES //

    state = {
        searchedMovies: [],
        searchedCast: []
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        let queryVal = qs.parse(this.props.location.search)
        this.searchVal = queryVal.q
        // console.log(this.searchVal)

        this.getMovieBySearch()
        this.getCastBySearch()
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    // GET DATA //
    getMovieBySearch = () => {
        if (this._isMounted) {
            axios.post(urlApi + 'movie/getMoviesByName', {
                q: this.searchVal
            }).then(res => {
                this.setState({ searchedMovies: res.data })
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    getCastBySearch = () => {
        if (this._isMounted) {
            axios.post(urlApi + 'cast/getCastByName', {
                q: this.searchVal
            }).then(res => {
                this.setState({ searchedCast: res.data })
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
    // GET DATA //

    // RENDERS //
    renderSearchedMovies = () => {
        let jsx = this.state.searchedMovies.map(val => {
            return (
                <Link to={`/movie-details/${val.id}`} key={val.id}
                    className='card rounded text-decoration-none bg-transparent m-3'
                    style={{ width:'170px' }}>
                        <img src={val.poster} data-tip={val.movieName} className='rounded' width='170px' height='250px' alt={`[POSTER] ${val.movieName}`} />
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

    renderSearchedCast = () => {
        let jsx = this.state.searchedCast.map(val => {
            return (
                <div key={val.id} style={{ width: "12rem" }} className='card rounded mx-4 my-4'>
                    <Link to={`/cast-details/${val.id}`} className='text-decoration-none text-dark'>
                        <img className="img-fluid rounded-top opacity-90" src={val.image} alt={val.castName} />
                        <h6 className='text-center font-weight-bold pt-2 px-1'>{val.castName}</h6>
                    </Link>
                </div>
            )
        })
        return jsx
    }
    // RENDERS //
    

    render() {
        // LOADING //
        if (!this._isMounted) {
           return <LoadingScreen />
        }
        // LOADING //

        // NO RESULTS CONDITION //
        if (this.state.searchedMovies.length < 1 && this.state.searchedCast < 1) {
            return (
                <div className='p-5 text-center badge-dark'>
                    <img src={NoResults} className='pt-5 mt-5' height='325px' alt="No Results" />
                    <div className='white-text p-5'>
                        <h2 className='font-weight-bold'>NO RESULTS</h2>
                        <h5 className='font-italic'>
                            Sorry, there are no results for this search. Please try another word or phrase.
                        </h5>
                    </div>
                </div>
            )
        }
        // NO RESULTS CONDITION //

        // RETURN WITH RESULTS //
        return (
            <div className='pb-5 badge-dark'>
                {/* Top Spacing Purpose */}
                <h1 className='mb-5'>&nbsp;</h1>
                <ReactTooltip place="top" type="dark" effect="float"/>
                {/* Top Spacing Purpose */}
                
                {/* SEARCHED MOVIES */}
                <div className="container-fluid px-5 py-3">
                    <h5 className='white-text border-bottom pb-2'>
                        Search Results - Movies <span className='font-small font-weight-bold'>( {this.state.searchedMovies.length} )</span>
                        <span className='float-right font-small text-white-50 mt-2'>Search : <b>{this.searchVal}</b></span>
                    </h5>
                    <div className="row justify-content-center">
                        {this.renderSearchedMovies()}
                    </div>
                </div>
                {/* SEARCHED MOVIES */}

                <br/>

                {/* SEARCHED CAST */}
                <div className="container-fluid px-5 py-3">
                    <h5 className='white-text border-bottom pb-2'>
                        Search Results - Artists <span className='font-small font-weight-bold'>( {this.state.searchedCast.length} )</span>
                        <span className='float-right font-small text-white-50 mt-2'>Search : <b>{this.searchVal}</b></span>
                    </h5>
                    <div className="row justify-content-center">
                        {this.renderSearchedCast()}
                    </div>
                </div>
                {/* SEARCHED CAST */}
            </div>
        )
        // RETURN WITH RESULTS //
    }
}

export default SearchResult;