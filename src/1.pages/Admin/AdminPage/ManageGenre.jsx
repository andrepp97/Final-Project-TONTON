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
                <MDBListGroupItem key={val.id} className='rounded-pill mx-1 my-2 p-1 pl-3 bg-dark white-text justify-content-between'>
                    {val.genreName}
                    <MDBBtn
                        color='transparent'
                        className='py-0 px-2 ml-3 grey-text rounded-circle font-weight-bold'
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
            <div className='container py-2'>
                <div className="card">
                    <MDBBtn color='deep-purple' className='white-text py-2 mx-5 mt-4' onClick={() => this.setState({modalOpen: true})}>
                        <MDBIcon icon="plus" className='mr-3' />
                        ADD GENRE
                    </MDBBtn>
                    <div className="row px-5 py-4 d-flex justify-content-between">
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