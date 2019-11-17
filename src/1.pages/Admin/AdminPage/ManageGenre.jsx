import React, { Component } from 'react';
import Axios from 'axios';
import {urlApi} from '../../../3.helpers/database'
import { MDBListGroupItem, MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";

class ManageGenre extends Component {
    state = {
        genreData: [],
        modalOpen: false,
        addGenre: ''
    }

    // LIFECYCLE //
    componentDidMount() {
        this.getAllGenre()
    }
    // LIFECYCLE //

    // GET DATA //
    getAllGenre = () => {
        Axios.get(urlApi + 'admin/getAllGenre')
        .then(res => {
            this.setState({ genreData: res.data })
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    // GET DATA //

    // RENDER GENRE //
    renderAllGenre = () => {
        return this.state.genreData.map(val => {
            return (
                <MDBListGroupItem key={val.id} className='genre-pill rounded-pill bg-dark'>
                    <label className='genre-label'>{val.genreName}</label>
                    <MDBBtn
                        color='transparent'
                        className='py-0 px-2 grey-text rounded-circle font-weight-bold float-right'
                        onClick={() => this.deleteGenre(val.id)}
                    >
                            x
                    </MDBBtn>
                </MDBListGroupItem>
            )
        })
    }
    // RENDER GENRE //

    // FUNCTIONS //
    saveNewGenre = () => {
        if (this.state.addGenre) {
            Axios.post(urlApi + 'admin/addNewGenre', {
                genreName: this.state.addGenre
            }).then(res => {
                console.log(res.data)
                this.setState({modalOpen: false, addGenre: ''})
                this.getAllGenre()
            }).catch(err => {
                console.log(err)
            })
        }
    }

    deleteGenre = (idGen) => {
        Axios.delete(urlApi + `admin/deleteGenre/${idGen}`)
        .then(res => {
            console.log(res.data)
            this.getAllGenre()
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    // FUNCTIONS //

    render() {
        return (
            <div className='container'>
                <div className="container border rounded mb-2 px-2 py-1">
                    <MDBBtn color='deep-purple' className='white-text' onClick={() => this.setState({ modalOpen: true })}>
                        <MDBIcon icon="plus" className='mr-2' />
                        ADD GENRE
                    </MDBBtn>
                </div>

                <div className="card">
                    <div className="row px-5 py-4 d-flex">
                        {this.renderAllGenre()}
                    </div>
                </div>

                {/* MODAL ADD GENRE */}
                <MDBModal isOpen={this.state.modalOpen} toggle={() => this.setState({ modalOpen: false })} centered>
                    <MDBModalHeader toggle={() => this.setState({ modalOpen: false })}>
                        Add Genre
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            label='Genre'
                            value={this.state.addGenre}
                            onChange={(e) => this.setState({addGenre: e.target.value})}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="light"
                            onClick={() => this.setState({ modalOpen: false, addGenre: '' })}
                        >
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="deep-purple"
                            className='white-text'
                            onClick={this.saveNewGenre}
                        >
                            Save
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {/* MODAL ADD GENRE */}
            </div>
        );
    }
}

export default ManageGenre;