import React, {Component} from 'react'
import Axios from 'axios'
import Countdown from 'react-countdown-now'
import NumberFormat from 'react-number-format'
import {MDBBtn} from 'mdbreact'
import { connect } from 'react-redux'
import { Redirect, Link } from "react-router-dom"
import { urlApi } from '../../3.helpers/database'
import { navItemChange } from '../../redux/1.actions'
import PaymentImg from '../../img/illustrations/wallet.svg'


class Payment extends Component {
    _isMounted = false
    userUpload = null

    state = {
        userBillData: null,
        dataFetched: false,
        isLoading: false
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        this.getUserBill()
        this.props.navItemChange('PAYMENT')
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    // GET DATA //
    getUserBill = () => {
        Axios.post(urlApi + 'user/getUserBillById', {
            idUser: this.props.id
        }).then(res => {
            if (this._isMounted) {
                this.setState({ userBillData: res.data, dataFetched: true })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    // GET DATA //

    // USER TRANSFER RECEIPT //
    onUserUploadFile = (e) => {
        console.log(e.target.files)
        if (e.target.files[0]) {
            this.userUpload = e.target.files
        } else {
            this.userUpload = null
        }
    }

    onUserSubmitFile = () => {
        this.setState({isLoading: true})
        if (this.userUpload) {
            var formdata = new FormData()

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            var idUser = { idUser: this.props.id }

            formdata.append('image', this.userUpload[0])
            formdata.append('data', JSON.stringify(idUser))

            Axios.post(urlApi + 'user/userUploadReceipt', formdata, options)
                .then(res => {
                    console.log(res.data)
                    this.userUpload = null
                    window.location = '/my-bills'
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            alert('Please Upload A File First !')
        }
    }
    // USER TRANSFER RECEIPT //

    // RENDERS //
    renderTimeout = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render Completed State
            return <h4 className='border rounded border-danger black-text text-center p-3'>Your Session Has Expired</h4>
        } else {
            // Render Countdown
            return (
                <>
                    <h6 className='w-100 text-center'>Complete Your Payment Before</h6>
                    <h2 className='text-center'>{hours} : {minutes} : {seconds}</h2>
                </>
            )
        }
    }

    renderUploadFile = () => {
        if (this.state.userBillData.status === 'WAITING FOR PAYMENT') {
            return (
                <div className="row p-5 black-text">
                    <div className="col-md-6 offset-md-3 text-center">
                        <h6 className='text-center'>Upload Your Transfer Payment Receipt</h6>
                        <div className="custom-file mt-2">
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png, .gif, .svg, .bmp, .pdf"
                                className="border shadow"
                                onChange={this.onUserUploadFile}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 offset-md-3 text-center pt-3">
                        <MDBBtn
                            color='deep-purple'
                            className='white-text px-4'
                            onClick={this.onUserSubmitFile}
                            disabled = {this.state.isLoading}
                        >
                            {this.state.isLoading
                            ?
                            <>
                                <div className="spinner-border mr-2" role="status"></div>
                                <span>SUBMIT</span>
                            </>
                            :
                            'SUBMIT'}
                        </MDBBtn>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container-fluid p-5 black-text">
                    <h2 className='text-center'>Payment Receipt Uploaded</h2>
                </div>
            )
        }
    }
    // RENDERS //


    render(){
        // REDIRECT TO HOME OF USER NOT LOGIN //
        if (!this.props.username) {
            return <Redirect to='/' />
        }
        // REDIRECT TO HOME OF USER NOT LOGIN //

        // FETCHING DATA SCREEN //
        if (!this.state.dataFetched) {
           return (
               <div className="container p-5">
                   <h1 className='text-center pt-5'>COLLECTING DATA</h1>
                   <div className='d-flex justify-content-center my-4'>
                       <div className="spinner-grow text-primary" role="status"></div>
                       <div className="spinner-grow text-success mx-2" role="status"></div>
                       <div className="spinner-grow text-info" role="status"></div>
                   </div>
               </div>
           )
        }
        // FETCHING DATA SCREEN //

        // NO DATA SCREEN //
        if (this.state.userBillData === undefined) {
            return (
                <div className="container text-center py-5">
                    <h1 className='py-5'>No Data</h1>
                    <Link to='/' className='text-decoration-none'>
                        <MDBBtn color='deep-purple' className='white-text p-3'>Discover Movies</MDBBtn>
                    </Link>
                </div>
            )
        }
        // NO DATA SCREEN //

        // MAIN SCREEN //
        return (
            <div className='page p-5 badge-dark' style={{height:'100vh'}}>
                <h1>&nbsp;</h1>

                {/* PAYMENT HEADER */}
                <div className="card col-lg-8 offset-lg-2 mt-4">
                    <img src={PaymentImg}
                        alt='User Payment'
                        height='120px'
                        className='mt-n4 mb-4'
                    />
                    <div className="row px-4 py-2 border-top border-bottom border-secondary text-center">
                        <h4 className='col-md-8 black-text'>30 Days TONTON All Access</h4>
                        <h4 className='col-md-4 text-dark'>
                            <NumberFormat
                                value={this.state.userBillData.total_pay}
                                thousandSeparator={true}
                                displayType={'text'}
                                prefix={'Rp '}
                            />
                        </h4>
                    </div>
                    {/* PAYMENT HEADER */}

                    {/* RENDER USER UPLOAD */}
                    {this.renderUploadFile()}
                    {/* RENDER USER UPLOAD */}

                    {/* COUNTDOWN TIMER */}
                    <div className="row p-3 border-top border-secondary black-text">
                        <div className="col-md-6 offset-md-3">
                            <Countdown
                                date={Date.now() + this.state.userBillData.countdown}
                                renderer={this.renderTimeout}
                            />
                        </div>
                    </div>
                    {/* COUNTDOWN TIMER */}
                </div>
            </div>
        );
        // MAIN SCREEN //
    }
};

const mapStateToProps = state => {
    return state.user
}

export default connect(mapStateToProps, { navItemChange })(Payment);