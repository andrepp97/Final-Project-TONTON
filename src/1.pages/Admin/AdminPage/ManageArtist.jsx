import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment'
import { urlApi } from '../../../3.helpers/database'
import {
    MDBBtn, MDBIcon,
    MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader
} from "mdbreact"
import { ToastContainer, toast, Flip } from 'react-toastify'


class ManageArtist extends Component {
    _isMounted = false

    state = {
        artistData: [],
        isLoading: false,
        modalOpen: false,
        status: '',
        artistName: '',
        artistImg: '',
        artistGender: 'Male',
        artistBirth: '',
        artistBio: '',
        selectedId: 0,
        editName: '',
        editImg: '',
        editGender: '',
        editBirth: '',
        editBio: ''
    }

    // LIFECYCLE //
    componentDidMount() {
        this.getArtistData('asc', '')
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    // GET DATA //
    getArtistData = (sorting, searchValue) => {
        Axios.get(urlApi + 'admin/getAllArtist',{
            params: {
                sort: sorting,
                searchValue
            }
        }).then(res => {
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
                <div key={val.id}
                    style={{ width: "9rem", cursor:'pointer' }}
                    className='card rounded mb-4 mx-2 img-artist'
                    onClick={() => this.setState({
                        status: 'Artist Details', modalOpen: true,
                        selectedId: val.id, editName: val.castName, editImg: val.image,
                        editBirth: val.birthday, editGender: val.gender, editBio: val.bio
                    })}
                >
                    <img src={val.image || this.avatar}
                        alt={val.castName}
                        className="img-fluid rounded-top opacity-90"
                    />
                    <h6 className='text-center font-weight-bold pt-2 px-1'>{val.castName}</h6>
                </div>
            )
        })
    }
    // RENDER DATA //

    // FUNCTIONS //
    searchArtistHandler = (searchValue) => {
        this.getArtistData(this.refs.sortBy.value, searchValue)
    }

    saveNewArtist = () => {
        this.setState({ isLoading: true })
        Axios.post(urlApi + 'admin/addNewArtist', {
            castName: this.state.artistName,
            image: this.state.artistImg,
            birthday: this.state.artistBirth,
            gender: this.state.artistGender,
            bio: this.state.artistBio
        }).then(res => {
            console.log(res.data)
            this.setState({ isLoading: false, modalOpen: false })
            this.getArtistData(this.refs.sortBy.value, this.refs.searchArtist.value)
            toast.success('Artist successfully added')
        }).catch(err => {
            console.log(err.response)
            this.setState({ isLoading: false })
        })
    }

    updateCurrentArtist = () => {
        this.setState({ isLoading: true })
        Axios.post(urlApi + `admin/updateArtist/${this.state.selectedId}`, {
            castName: this.state.editName,
            image: this.state.editImg,
            birthday: this.state.editBirth,
            gender: this.state.editGender,
            bio: this.state.editBio
        }).then(res => {
            console.log(res.data)
            this.setState({ isLoading: false, modalOpen: false })
            this.getArtistData(this.refs.sortBy.value, this.refs.searchArtist.value)
            toast.success('Artist successfully Updated')
        }).catch(err => {
            console.log(err.response)
            this.setState({ isLoading: false })
        })
    }

    deleteCurrentArtist = () => {
        Axios.delete(urlApi + `admin/deleteArtist/${this.state.selectedId}`)
        .then(res => {
            console.log(res.data)
            this.setState({ modalOpen: false, selectedId: 0 })
            this.getArtistData('asc', '')
            toast.error('Artist Deleted')
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    // FUNCTIONS //


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
                {/* TOAST CONTAINER */}
                <ToastContainer
                    autoClose={2000}
                    hideProgressBar={false}
                    pauseOnHover={false}
                    closeButton={false}
                    transition={Flip}
                    closeOnClick
                    draggable
                />
                {/* TOAST CONTAINER */}

                {/* HEADER PANEL */}
                <div className="row border rounded py-2 mb-2 mx-1">
                    <div className="col-lg-4">
                        <MDBBtn
                            color='deep-purple'
                            className='white-text'
                            onClick={() => this.setState({ modalOpen: true, status: 'New Artist' })}
                        >
                            <MDBIcon icon="plus"/>&nbsp;
                            New Artist
                        </MDBBtn>
                    </div>
                    <div className="col-lg-4 py-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Search</span>
                            </div>
                            <input type="text"
                                ref="searchArtist"
                                className="form-control"
                                placeholder="Find Artists . . ."
                                onChange={(e) => this.searchArtistHandler(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 py-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Sort by</span>
                            </div>
                            <select
                                ref="sortBy"
                                className='custom-select w-responsive'
                                style={{width: '8rem'}}
                                onChange={(e) => this.getArtistData(e.target.value, this.refs.searchArtist.value)}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                                <option value="popularity">Popularity</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* HEADER PANEL */}

                {/* ARTIST RENDER */}
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <h6 className='badge badge-dark d-block px-5 py-2 mt-2 mb-3'>
                            {`${this.state.artistData.length} Results`}
                        </h6>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {this.renderArtistData()}
                </div>
                {/* ARTIST RENDER */}

                {/* MODAL NEW ARTIST */}
                <MDBModal
                    isOpen={this.state.modalOpen}
                    toggle={() => this.setState({ modalOpen: false })}
                    centered
                >
                    <MDBModalHeader toggle={() => this.setState({ modalOpen: false })}>
                        {this.state.status}
                    </MDBModalHeader>
                    <MDBModalBody className='container bg-light'>
                        <div className="row">
                            <div className="col-md-12">
                                <div className='form-group'>
                                    <span>Artist Name</span>
                                    {
                                        this.state.status === 'New Artist'
                                        ?
                                        <input
                                            type='text'
                                            className='form-control mb-3'
                                            placeholder='e.g. Dwayne Johnson'
                                            value={this.state.artistName}
                                            onChange={(e) => this.setState({ artistName: e.target.value })}
                                            required
                                        />
                                        :
                                        <input
                                            type='text'
                                            className='form-control mb-3'
                                            placeholder='e.g. Vanessa Kirby'
                                            value={this.state.editName}
                                            onChange={(e) => this.setState({ editName: e.target.value })}
                                            required
                                        />
                                    }
                                    <span>Artist Image</span>
                                    {
                                        this.state.status === 'New Artist'
                                        ?
                                        <input
                                            type='text'
                                            className='form-control mb-3'
                                            placeholder='Image Link'
                                            value={this.state.artistImg}
                                            onChange={(e) => this.setState({ artistImg: e.target.value })}
                                            required
                                        />
                                        :
                                        <input
                                            type='text'
                                            className='form-control mb-3'
                                            placeholder='e.g. Vanessa Kirby'
                                            value={this.state.editImg}
                                            onChange={(e) => this.setState({ editImg: e.target.value })}
                                            required
                                        />
                                    }
                                    <div className="row">
                                        <div className="col-md-6">
                                            <span>Birthdate</span>
                                            {
                                                this.state.status === 'New Artist'
                                                ?
                                                <input
                                                    type='date'
                                                    className='form-control'
                                                    placeholder='Birthdate'
                                                    value={this.state.artistBirth}
                                                    onChange={(e) => this.setState({ artistBirth: e.target.value })}
                                                />
                                                :
                                                <input
                                                    type='date'
                                                    className='form-control'
                                                    placeholder='Birthdate'
                                                    value={moment(this.state.editBirth).format('YYYY-MM-DD')}
                                                    onChange={(e) => this.setState({ editBirth: e.target.value })}
                                                />
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <span>Gender</span>
                                            {
                                                this.state.status === 'New Artist'
                                                ?
                                                <select
                                                    className='custom-select'
                                                    value={this.state.artistGender}
                                                    onChange={(e) => this.setState({ artistGender: e.target.value })}
                                                >
                                                    <option value="Male" defaultValue>Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                                :
                                                <select
                                                    className='custom-select'
                                                    value={this.state.editGender}
                                                    onChange={(e) => this.setState({ editGender: e.target.value })}
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            }
                                        </div>
                                    </div>
                                    {
                                        this.state.status === 'New Artist'
                                        ?
                                        <textarea
                                            style={{ resize: 'none' }}
                                            className='form-control mt-3'
                                            placeholder='Biography (Max 10.000 characters)'
                                            maxLength="10000"
                                            rows="8"
                                            value={this.state.artistBio}
                                            onChange={(e) => this.setState({ artistBio: e.target.value })}
                                        />
                                        :
                                        <textarea
                                            style={{ resize: 'none' }}
                                            className='form-control mt-3'
                                            placeholder='Biography (Max 10.000 characters)'
                                            maxLength="10000"
                                            rows="8"
                                            value={this.state.editBio}
                                            onChange={(e) => this.setState({ editBio: e.target.value })}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        {
                            this.state.status === 'New Artist'
                            ?
                            null
                            :
                            <MDBBtn color='red' className='white-text mx-5' onClick={this.deleteCurrentArtist}>
                                Delete
                            </MDBBtn>
                        }
                        <MDBBtn color="light" onClick={() => this.setState({modalOpen: false})}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn 
                            color="deep-purple"
                            className='white-text px-4'
                            onClick={this.state.status === 'New Artist' ? this.saveNewArtist : this.updateCurrentArtist}
                            disabled={this.state.isLoading}
                        >
                            {
                                this.state.isLoading
                                ?
                                <>
                                    <div className="spinner-border mr-2" role="status"></div>
                                    <span>SAVE</span>
                                </>
                                :
                                'SAVE'
                            }
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {/* MODAL NEW ARTIST */}
            </div>
        );
    }
}

export default ManageArtist;