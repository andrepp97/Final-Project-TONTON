import React, { Component } from 'react'
import Axios from 'axios'
import {
    MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon, MDBTooltip
} from 'mdbreact'
import { urlApi } from '../../../3.helpers/database'

class ManageMovies extends Component {
    _isMounted = false

    state = {
        dataMovies: []
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        this.getAllMovies()
        console.log(this.data)
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    // GET DATA //
    getAllMovies = () => {
        Axios.post(urlApi + 'admin/getAllMovies')
        .then(res => {
            if (this._isMounted) {
                this.setState({dataMovies: res.data})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    // GET DATA //

    // RENDER DATA //
    renderAllMovies = () => {
        return this.state.dataMovies.map((val) => {
            return (
                <tr key={val.id}>
                    <td className='text-center py-4 font-weight-bold'>{val.id}</td>
                    <td className='text-center py-2'>
                        <img src={val.poster} alt={val.movieName} height='55px' className='rounded' />
                    </td>
                    <td className='py-4 font-weight-bold'>{val.movieName}</td>
                    <td className='py-4'>{val.filePath}</td>
                    <td className='py-4'>{val.type}</td>
                    <td className='py-2'>
                        <MDBTooltip placement="left">
                            <MDBBtn color='indigo'
                                className='white-text'
                                onClick={() => alert('Yoi Men')}
                            >
                                <MDBIcon icon="pen" />
                            </MDBBtn>
                            <div>Edit</div>
                        </MDBTooltip>
                    </td>
                </tr>
            )
        })
    }
    // RENDER DATA //


    render() {
        return (
            <div className='container py-2'>
                <MDBTable hover responsive>
                    <MDBTableHead color='dark'>
                        <tr>
                            <th className='text-center'>#</th>
                            <th>Poster</th>
                            <th>Movie Title</th>
                            <th>File Path</th>
                            <th>Type</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            this.state.dataMovies.length < 1
                            ?
                            <tr>
                                <td colSpan='6' className='text-center white-text bg-danger py-4'>
                                    <h5>Looks like there is no movies in your database.</h5>
                                </td>
                            </tr>
                            :
                            this.renderAllMovies()
                        }
                    </MDBTableBody>
                </MDBTable>
            </div>
        );
    }
}

export default ManageMovies;