import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {
    MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon, MDBTooltip,
    MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter
} from 'mdbreact'
import { ToastContainer,toast,Flip } from 'react-toastify'
import { urlApi } from '../../../3.helpers/database'

let genreTemp = []
let castTemp = []

const initialState = {
    modalDelete: false,
    deleteId: 0,
    deleteMovie: '',
    modalOpen: false,
    status: '',
    isLoading: false,
    movieUpload: '',
    movieTitle: '',
    movieTrailer: '',
    moviePoster: '',
    movieCountry: '',
    movieLang: '',
    movieDirector: '',
    movieDuration: 0,
    movieRelease: new Date().toISOString().slice(0, 10),
    movieType: '',
    movieSynopsis: ''
};


class ManageMovies extends Component {
    // Local Variable //
    _isMounted = false
    searchMovie = ''
    sortBy = ''
    sortDir = 'asc'
    // Local Variable //

    state = {
        dataMovies: [],
        movieGenres: [],
        movieCast: [],
        uploadProgress: 0,
        uploadSuccess: false,
        ...initialState
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        this.getAllMovies()
        this.getAllGenre()
        this.getAllArtist('asc','')
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    // GET DATA //
    getAllMovies = () => {
        Axios.get(urlApi + 'admin/getAllMovies', {
            params: {
                sort: this.sortBy,
                sortDir: this.sortDir,
                searchMovie: this.searchMovie
            }
        })
        .then(res => {
            if (this._isMounted) {
                this.setState({
                    dataMovies: res.data
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    getAllGenre = () => {
        Axios.get(urlApi + 'admin/getAllGenre')
        .then(res => {
            this.setState({ movieGenres: res.data })
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    getAllArtist = (sorting, searchValue) => {
        Axios.get(urlApi + 'admin/getAllArtist', {
            params: {
                sort: sorting,
                searchValue
            }
        }).then(res => {
            this.setState({ movieCast: res.data })
        }).catch(err => {
            console.log(err.response)
        })
    }
    // GET DATA //

    // RENDER DATA //
    renderAllMovies = () => {
        return this.state.dataMovies.map((val, idx) => {
            return (
                <tr key={val.idMov} className='text-center'>
                    <td className='py-4 font-weight-bold'>{idx+1}</td>
                    <td className='py-2'>
                        <img src={val.poster} alt={val.movieName} height='55px' className='rounded' />
                    </td>
                    <td className='py-4 font-weight-bold'>{val.movieName}</td>
                    <td className='py-4'>{val.views}</td>
                    <td className='py-4'>{val.type}</td>
                    <td className='py-2'>
                        {/* <MDBTooltip placement="top">
                            <MDBBtn color='indigo'
                                className='white-text'
                                onClick={() => alert('Lagi Dibuat')}
                            >
                                <MDBIcon icon="pen" />
                            </MDBBtn>
                            <div>Edit</div>
                        </MDBTooltip> */}
                        <MDBTooltip placement="top">
                            <MDBBtn color='red'
                                className='white-text'
                                onClick={() => this.setState({ modalDelete: true, deleteId: val.idMov, deleteMovie: val.movieName })}
                            >
                                <MDBIcon icon="trash" />
                            </MDBBtn>
                            <div>Delete</div>
                        </MDBTooltip>
                    </td>
                </tr>
            )
        })
    }

    renderMovieGenres = () => {
        return this.state.movieGenres.map((val, idx) => {
            return (
                <div className="form-check form-check-inline" key={val.id}>
                    <input
                        type="checkbox"
                        id={`genre${val.id}`}
                        className="form-check-input"
                        value={val.id}
                        onChange={this.genreHandleChange}
                    />
                    <label className="form-check-label" htmlFor={`genre${val.id}`}>
                        {val.genreName}
                    </label>
                </div>
            )
        })
    }

    renderMovieCast = () => {
        return this.state.movieCast.map((val, idx) => {
            return (
                <option key={val.id} value={val.id} defaultChecked={val.idx === 1 ? true : false}>
                    {val.castName}
                </option>
            )
        })
    }
    // RENDER DATA //

    // FUNCTIONS //
    genreHandleChange(e) {
        const item = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            genreTemp.push(item)
        } else {
            genreTemp = genreTemp.filter(e => e !== item)
        }
        console.log(genreTemp)
    }

    sortMoviesHandler = (event) => {
        this.sortBy = event.target.value
        this.getAllMovies()
    }

    sortMoviesHandler2 = (event) => {
        this.sortDir = event.target.value
        this.getAllMovies()
    }

    searchMoviesHandler = (event) => {
        this.searchMovie = event.target.value
        this.getAllMovies()
    }

    chooseMovieHandler = (e) => {
        console.log(e.target.files)
        if (e.target.files[0]) {
            this.setState({ movieUpload: e.target.files[0]})
        } else {
            this.setState({movieUpload: null})
        }
    }

    uploadMovieHandler = async () => {
        this.setState({isLoading: true})
        if (this.state.movieUpload) {
            var formdata = new FormData()

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (ProgressEvent) => {
                    var percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    this.setState({ uploadProgress: percentCompleted })
                }
            }

            var movieObj = {
                movieName: this.state.movieTitle,
                trailer: this.state.movieTrailer,
                poster: this.state.moviePoster,
                releaseDate: this.state.movieRelease,
                country: this.state.movieCountry,
                lang: this.state.movieLang,
                duration: this.state.movieDuration,
                director: this.state.movieDirector,
                synopsis: this.state.movieSynopsis,
                type: this.state.movieType
            }

            // console.log(this.state.movieUpload)
            formdata.append('movie', this.state.movieUpload)
            formdata.append('data', JSON.stringify(movieObj))
            formdata.append('idUser', JSON.stringify(this.props.id))
            formdata.append('genres', JSON.stringify(genreTemp))
            formdata.append('cast', JSON.stringify(castTemp))

            await Axios.post(urlApi + 'admin/addNewMovie', formdata, options)
                .then(res => {
                    this.getAllMovies()
                    this.setState({...initialState, uploadSuccess: true, modalOpen: true})
                })
                .catch(err => {
                    console.log(err.response)
                    this.setState({ isLoading: false })
                })
        } else {
            alert('Please Upload A Movie First !')
            this.setState({isLoading: false})
        }
    }

    btnDeleteMovie = () => {
        Axios.delete(urlApi + `admin/deleteMovie/${this.state.deleteId}`)
        .then(res => {
            toast.error('Movie Deleted')
            this.setState({ modalDelete: false, deleteId: 0, deleteMovie: '' })
            this.getAllMovies()
        })
        .catch(err =>{
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
                    <div className="col-lg-3">
                        <MDBBtn
                            color='deep-purple'
                            className='white-text'
                            onClick={() => this.setState({ modalOpen: true, status: 'New Movie' })}
                        >
                            <MDBIcon icon="upload" />&nbsp;
                            Upload A Movie
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
                                placeholder="Find Movies . . ."
                                onChange={this.searchMoviesHandler}
                            />
                        </div>
                    </div>
                    <div className="col-lg-5 py-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Sort by</span>
                            </div>
                            <select
                                ref="sortBy"
                                className='custom-select w-responsive'
                                style={{ width: '8rem' }}
                                onChange={this.sortMoviesHandler}
                            >
                                <option value="name">Movie Title</option>
                                <option value="views">Views</option>
                            </select>
                            <select
                                className='custom-select w-responsive ml-1'
                                style={{ width: '8rem' }}
                                onChange={this.sortMoviesHandler2}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* HEADER PANEL */}

                {/* MAIN CONTENT */}
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <h6 className='badge badge-dark d-block px-5 py-2 mt-2 mb-3'>
                            {`${this.state.dataMovies.length} Results`}
                        </h6>
                    </div>
                </div>
                <MDBTable hover responsive>
                    <MDBTableHead color='dark'>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>Poster</th>
                            <th>Movie Title</th>
                            <th>Views</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            this.state.dataMovies.length < 1
                            ?
                            <tr>
                                <td colSpan='6' className='text-center white-text bg-danger py-4'>
                                    <h5>Looks like there is no results in your database.</h5>
                                </td>
                            </tr>
                            :
                            this.renderAllMovies()
                        }
                    </MDBTableBody>
                </MDBTable>
                {/* MAIN CONTENT */}

                {/* DELETE MOVIE MODAL */}
                <MDBModal isOpen={this.state.modalDelete} toggle={() => this.setState({ modalDelete: false })} centered>
                    <MDBModalHeader toggle={() => this.setState({ modalDelete: false })}>
                        Delete Movie
                    </MDBModalHeader>
                    <MDBModalBody>
                        You are about to DELETE <b>{this.state.deleteMovie}</b>.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="light"
                            onClick={() => this.setState({ modalDelete: false, deleteId: 0, deleteMovie: '' })}
                        >
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="red"
                            className='white-text'
                            onClick={this.btnDeleteMovie}
                        >
                            Delete
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {/* DELETE MOVIE MODAL */}

                {/* MOVIE MODAL */}
                <MDBModal
                    isOpen={this.state.modalOpen}
                    size="xl"
                    centered
                >
                    <MDBModalHeader toggle={() => this.setState({ modalOpen: false })}>
                        {this.state.status}
                    </MDBModalHeader>
                    <MDBModalBody className='bg-light'>
                        <div className="row mb-4">
                            <div className="col-lg-4 offset-lg-1">
                                <video src={this.state.movieUpload} className='border rounded shadow video-fluid' />
                                <input
                                    id="inputFile"
                                    type="file"
                                    accept=".mp4, .avi, .mkv, .flv, .rmvb"
                                    className='mb-3 mt-1 w-responsive'
                                    onChange={this.chooseMovieHandler}
                                />
                            </div>
                            <div className="col-lg-6">
                                <label>Main Information</label>
                                <input type="text"
                                    className='form-control'
                                    placeholder='Movie Title'
                                    value={this.state.movieTitle}
                                    onChange={(e) => this.setState({movieTitle: e.target.value})}
                                />
                                <input type="text"
                                    className='form-control my-2'
                                    placeholder='Trailer Link'
                                    value={this.state.movieTrailer}
                                    onChange={(e) => this.setState({ movieTrailer: e.target.value })}    
                                />
                                <input type="text"
                                    className='form-control'
                                    placeholder='Poster Link'
                                    value={this.state.moviePoster}
                                    onChange={(e) => this.setState({ moviePoster: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="row border-top border-bottom py-3">
                            <div className="col-lg-10 offset-lg-1">
                                <label>General Information</label>
                                <div className="row">
                                    <div className="col-md-4 mb-2">
                                        <input type="text"
                                            className='form-control'
                                            placeholder='Country'
                                            value={this.state.movieCountry}
                                            onChange={(e) => this.setState({ movieCountry: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <input type="text"
                                            className='form-control'
                                            placeholder='Language'
                                            value={this.state.movieLang}
                                            onChange={(e) => this.setState({ movieLang: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <input type="text"
                                            className='form-control'
                                            placeholder='Director'
                                            value={this.state.movieDirector}
                                            onChange={(e) => this.setState({ movieDirector: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3 pt-2">
                                    <div className="col-md-4 mb-2">
                                        <label>Duration</label>
                                        <div className='d-flex justify-content-between'>
                                            <input
                                                type="number"
                                                min='0'
                                                className='form-control'
                                                value={this.state.movieDuration}
                                                onChange={(e) => this.setState({ movieDuration: e.target.value })}
                                            />
                                            <label className='grey-text pt-2 ml-2'>Minutes</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <label>Release Date</label>
                                        <input
                                            type="date"
                                            className='form-control'
                                            placeholder='Language'
                                            value={this.state.movieRelease}
                                            onChange={(e) => this.setState({ movieRelease: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <label>Type</label>
                                        <select className='custom-select' onChange={(e) => this.setState({ movieType: e.target.value })}>
                                            <option value="F" defaultValue>Free</option>
                                            <option value="P">Premium</option>
                                        </select>
                                    </div>
                                </div>
                                <textarea
                                    cols="30" rows="4"
                                    placeholder='Synopsis'
                                    className='form-control mt-3'
                                    style={{ resize: 'none' }}
                                    value={this.state.movieSynopsis}
                                    onChange={(e) => this.setState({ movieSynopsis: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* MOVIE GENRES */}
                        <div id="genre-list" className="row">
                            <div className="col-md-10 offset-md-1 py-3">
                                <span>Genres</span>
                                <div className="row border mx-1 px-3 py-2">
                                    {this.renderMovieGenres()}
                                </div>
                            </div>
                        </div>
                        {/* MOVIE GENRES */}

                        {/* MOVIE CAST */}
                        <div className="row border-top py-3">
                            <div className="col-md-10 offset-md-1 pt-3">
                                <span>Cast</span>
                                <div className="row border mx-1 px-3 py-2">
                                    <div className="col-md-4 my-2">
                                        <select
                                            className='custom-select'
                                            onChange={(e) => castTemp[0] = [e.target.value, 1]}
                                        >
                                            {this.renderMovieCast()}
                                        </select>
                                    </div>
                                    <div className="col-md-4 my-2">
                                        <select 
                                            className='custom-select'
                                            onChange={(e) => castTemp[1] = [e.target.value, 2]}
                                        >
                                            {this.renderMovieCast()}
                                        </select>
                                    </div>
                                    <div className="col-md-4 my-2">
                                        <select 
                                            className='custom-select'
                                            onChange={(e) => castTemp[2] = [e.target.value, 3]}
                                        >
                                            {this.renderMovieCast()}
                                        </select>
                                    </div>
                                    <div className="col-md-4 my-2">
                                        <select 
                                            className='custom-select'
                                            onChange={(e) => castTemp[3] = [e.target.value, 4]}
                                        >
                                            {this.renderMovieCast()}
                                        </select>
                                    </div>
                                    <div className="col-md-4 my-2">
                                        <select 
                                            className='custom-select'
                                            onChange={(e) => castTemp[4] = [e.target.value, 5]}
                                        >
                                            {this.renderMovieCast()}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* MOVIE CAST */}

                        {
                            this.state.uploadProgress > 0
                            ?
                                <div id="upload-progress-bar">
                                    <label htmlFor="progressbar">Upload Progress</label>
                                    <div className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${this.state.uploadProgress}%` }}
                                        aria-valuenow={this.state.uploadProgress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        {this.state.uploadProgress}%
                                    </div>
                                </div>
                            :
                                null
                        }
                    </MDBModalBody>
                    <MDBModalFooter>
                        {
                            this.state.uploadSuccess
                            ?
                            <MDBBtn
                                color="deep-purple"
                                className='white-text px-4'
                                onClick={() => this.setState({ modalOpen: false, uploadProgress: 0, uploadSuccess: false })}
                            >
                                Finish
                            </MDBBtn>
                            :
                            <>
                                <MDBBtn
                                    color="light"
                                    disabled={this.state.isLoading}
                                    onClick={() => this.setState({ modalOpen: false })}
                                >
                                    Cancel
                                </MDBBtn>
                                <MDBBtn
                                    color="deep-purple"
                                    className='white-text px-4'
                                    disabled={this.state.isLoading}
                                    onClick={this.uploadMovieHandler}
                                >
                                    {
                                        this.state.isLoading
                                            ?
                                            <>
                                                <div className="spinner-border mr-2" role="status"></div>
                                                <span>Upload</span>
                                            </>
                                            :
                                            'Upload'
                                    }
                                </MDBBtn>
                            </>
                        }
                    </MDBModalFooter>
                </MDBModal>
                {/* MOVIE MODAL */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        name: state.user.username
    }
}

export default connect(mapStateToProps) (ManageMovies);