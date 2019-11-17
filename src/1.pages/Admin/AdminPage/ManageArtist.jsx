import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { urlApi } from '../../../3.helpers/database'
import { MDBBtn, MDBIcon } from "mdbreact"

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
    getArtistData = (sorting) => {
        Axios.get(urlApi + 'admin/getAllArtist',{
            params: {
                sort: sorting
            }
        }).then(res => {
            console.log(res.data)
            this.setState({ artistData: res.data })
        }).catch(err => {
            console.log(err.response)
        })
    }
    // GET DATA //

    // RENDER DATA //
    renderArtistData = () => {
        return this.state.artistData.map(val => {
            return (
                <div key={val.id} style={{ width: "9rem" }} className='card rounded mb-4 mx-2'>
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
                <div className="container d-flex justify-content-center py-5">
                    <div className="spinner-grow text-primary" />
                    <div className="spinner-grow text-success" />
                    <div className="spinner-grow text-danger" />
                </div>

            )
        }
        // LOADING //

        return (
            <div className='container'>
                <div className="container border rounded mb-2 px-2 py-1">
                    <MDBBtn color='deep-purple' className='white-text'>
                        <MDBIcon icon="plus" className='mr-2' />
                        New Artist
                    </MDBBtn>
                    <div className='float-right mt-1 mr-1'>
                        <span>Sort </span>
                        <select name="order-by"
                                className='custom-select'
                                style={{width: '8rem'}}
                                onChange={(e) => this.getArtistData(e.target.value)}
                        >
                            <option value="asc">A - Z</option>
                            <option value="desc">Z - A</option>
                            <option value="popularity">Popularity</option>
                        </select>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    {this.renderArtistData()}
                </div>
            </div>
        );
    }
}

export default ManageArtist;