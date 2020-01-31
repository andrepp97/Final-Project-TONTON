import React, { Component } from 'react';
import Axios from 'axios';
import {urlApi} from '../../../3.helpers/database';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon, MDBTooltip } from 'mdbreact'
import { ToastContainer, toast, Flip } from 'react-toastify'


class ManagePayment extends Component {
    _isMounted = false

    state = {
        paymentData: [],
        selectedImg: ''
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        this.getUserPaymentData()
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    // GET DATA //
    getUserPaymentData = () => {
        Axios.get(urlApi + 'admin/getUserPayment')
        .then(res => {
            console.log(res.data)
            if (this._isMounted) {
                this.setState({ paymentData: res.data })
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    // GET DATA //

    // RENDER DATA //
    renderUserPayment = () => {
        return this.state.paymentData.map((val,idx) => {
            return (
                <tr key={val.id} className='text-center'>
                    <td>{idx+1}</td>
                    <td>{val.username}</td>
                    <td>{val.email}</td>
                    <td>{val.description}</td>
                    <td>{val.payment_status}</td>
                    <td>
                        <a href="#img1">
                            <img
                                src={urlApi.slice(0,urlApi.length-1)+val.receipt}
                                alt="Transfer Receipt"
                                height="40px"
                                className='rounded img-responsive'
                                onClick={() => this.setState({ selectedImg: val.receipt })}
                            />
                        </a>
                        <a href="#_" className="lightbox" id="img1">
                            <img
                                src={urlApi.slice(0, urlApi.length - 1) + this.state.selectedImg}
                                alt="Transfer Receipt"
                            />
                        </a>
                    </td>
                    <td>
                        <MDBTooltip>
                            <MDBBtn color='red'
                                className='white-text my-0'
                                onClick={() => this.declineUserPayment(val.idUser)}
                            >
                                <MDBIcon icon="ban" />
                            </MDBBtn>
                            <div>Decline</div>
                        </MDBTooltip>
                        <MDBTooltip>
                            <MDBBtn color='dark-green'
                                className='white-text my-0'
                                onClick={() => this.verifyUserPayment(val.idUser)}
                            >
                                <MDBIcon icon="check" />
                            </MDBBtn>
                            <div>Verify</div>
                        </MDBTooltip>
                    </td>
                </tr>
            )
        })
    }
    // RENDER DATA //

    // FUNCTIONS //
    verifyUserPayment = (idUser) => {
        Axios.post(urlApi + 'admin/verifyPayment', {
            idUser
        }).then(res => {
            console.log(res.data)
            this.getUserPaymentData()
            toast.success('Payment Verified')
        }).catch(err => {
            console.log(err.response)
        })
    }

    declineUserPayment = (idUser) => {
        Axios.post(urlApi + 'admin/declinePayment', {
            idUser
        }).then(res => {
            console.log(res.data)
            this.getUserPaymentData()
            toast.error('Payment Declined')
        }).catch(err => {
            console.log(err.response)
        })
    }
    // FUNCTIONS //


    render() {
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

                <MDBTable hover responsive>
                    <MDBTableHead color='dark'>
                        <tr className='text-center'>
                            <th className='text-center'>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Payment Status</th>
                            <th className='text-center'>Receipt</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.renderUserPayment()}
                    </MDBTableBody>
                </MDBTable>
            </div>
        );
    }
}

export default ManagePayment;