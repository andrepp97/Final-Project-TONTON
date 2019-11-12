import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { urlApi } from '../../../3.helpers/database'

class ManageArtist extends Component {
    _isMounted = false

    state = {
        artistData: []
    }

    // LIFECYCLE //
    componentDidMount() {
        this.getArtistData()
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    
    // LIFECYCLE //

    // GET DATA //
    getArtistData = () => {
        Axios.get(urlApi + 'admin/getAllArtist')
        .then(res => {
            console.log(res.data)
            this.setState({ artistData: res.data })
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    // GET DATA //

    // RENDER DATA //
    renderArtistData = () => {
        return this.state.artistData.map(val => {
            return (
                <div key={val.id} style={{ width: "10rem" }} className='card rounded mb-4 mx-1'>
                    <Link to={`/cast-details/${val.id}`} className='text-decoration-none rounded text-dark img-artist'>
                        <img className="img-fluid rounded-top opacity-90" src={val.image} alt={val.castName} />
                        <h6 className='text-center font-weight-bold pt-2 px-1'>{val.castName}</h6>
                    </Link>
                </div>
            )
        })
    }
    // RENDER DATA //

    render() {
        // LOADING //
        if (!this._isMounted) {
            return (
                <>
                    <div className="container d-flex justify-content-center">
                        <div className="spinner-grow text-primary" role="status" />
                        <div className="spinner-grow text-success" role="status" />
                        <div className="spinner-grow text-danger" role="status" />
                    </div>
                </>
            )
        }
        // LOADING //

        return (
            <div className='container py-2'>
                <div className='row justify-content-center'>
                    {this.renderArtistData()}
                </div>
            </div>
        );
    }
}

export default ManageArtist;