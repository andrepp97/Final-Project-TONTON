import React, { Component } from 'react'
import Axios from 'axios'
import { urlApi } from '../../3.helpers/database'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MDBBtn, MDBModalBody, MDBModal, MDBModalFooter, MDBModalHeader } from 'mdbreact'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { navItemChange, calcUserSubs } from '../../redux/1.actions'
import './Subs.css'


class Subscription extends Component {
    state = {
        premiumPrice: null,
        create_transaction: false,
        modalOpen: false
    }

    // LIFECYCLE //
    componentDidMount() {
        window.scrollTo(0, 0);

        // REDUX ACTIONS //
        this.props.calcUserSubs(this.props.id)
        this.props.navItemChange('')
        // REDUX ACTIONS //

        this.getPriceData()
    }
    // LIFECYCLE //

    // GET DATA //
    getPriceData = () => {
        Axios.post(urlApi + 'user/getPriceData')
        .then(res => {
            this.setState({ premiumPrice: res.data.pricePerMonth })
        })
        .catch(err => {
            console.log(err)
        })
    }
    // GET DATA //

    // USER BEHAVIOR //
    onUserUpgrade = () => {
        Axios.post(urlApi + 'user/getUserBillById', {
            idUser: this.props.id
        }).then(res => {
            console.log('OK 1')
            if (res.data.length < 1) {
                Axios.post(urlApi + 'user/userUpgradePremium', {
                    idUser: this.props.id,
                    pricePerMonth: this.state.premiumPrice
                }).then(res => {
                    console.log('OK 2')
                    Axios.post(urlApi + 'user/getUserBillById', {
                        idUser: this.props.id
                    }).then(res => {
                        console.log('OK 3')
                        Axios.post(urlApi + 'user/userCreateEventTimeout', {
                            idTransaction: res.data.id
                        }).then(res => {
                            console.log('OK 4')
                            console.log(res.data)
                        }).catch(err => {
                            console.log(err)
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
            this.setState({ create_transaction: true })
        }).catch(err => {
            console.log(err)
        })
    }

    userCancelPlan = () => {
        Axios.post(urlApi + 'user/userCancelPlan', {
            idUser: this.props.id
        }).then(res => {
            toast.error('You have canceled your plan, thank you for trusting us.')
            this.setState({modalOpen: false})
            this.props.calcUserSubs(this.props.id)
        }).catch(err => {
            console.log(err.response)
        })
    }
    // USER BEHAVIOR //

    
    render() {
        if (this.props.username === '' && this.props.role === '') {
            return <Redirect to='/home' />
        }

        if (this.state.create_transaction) {
            window.location = `/user-payment`
        }

        if (this.props.subsName === 'Premium') {
            return (
                <div className="wallpaper2 page" style={{height:'100vh'}}>
                    <h1 className='mb-5'>&nbsp;</h1>
                    <div className="container py-5">
                        <div className="row">
                            <div className='card col-md-8 offset-md-2 text-center py-4'>
                                <h1>{this.props.subsName} User</h1>
                                <h5 className='border-top mx-5 py-3'>
                                    {
                                        this.props.remaining >= 24
                                        ?
                                        Math.floor(this.props.remaining / 24) + ' Days Remaining'
                                        :
                                        Math.floor(this.props.remaining) + ' Hours Remaining'
                                    }
                                </h5>
                                <MDBBtn
                                    color='red'
                                    className='white-text mx-5'
                                    onClick={() => this.setState({modalOpen: true})}
                                >
                                    Cancel Plan
                                </MDBBtn>
                            </div>
                        </div>
                    </div>

                    {/* CANCEL PLAN MODAL */}
                    <MDBModal isOpen={this.state.modalOpen} toggle={() => this.setState({ modalOpen: false })} centered>
                        <MDBModalHeader toggle={() => this.setState({ modalOpen: false })}>
                            Delete Movie
                    </MDBModalHeader>
                        <MDBModalBody>
                            You are about to <b>CANCEL YOUR PREMIUM PLAN</b>.
                    </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="light"
                                onClick={() => this.setState({ modalOpen: false})}
                            >
                                Cancel
                        </MDBBtn>
                            <MDBBtn color="red"
                                className='white-text'
                                onClick={this.userCancelPlan}
                            >
                                Yes, I Want To Cancel
                        </MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    {/* CANCEL PLAN MODAL */}
                </div>
            )
        }

        return (
            <div className='wallpaper2 page py-5'>
                <h6 className='my-5'>&nbsp;</h6>
                {/* TOAST CONTAINER */}
                <ToastContainer
                    autoClose={2500}
                    hideProgressBar={false}
                    pauseOnHover={false}
                    closeButton={false}
                    transition={Flip}
                    closeOnClick
                    draggable
                />
                {/* TOAST CONTAINER */}

                <div className='container'>
                    {/* Price Table */}
                    <div className="col-lg-6 offset-lg-3 mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="price card text-center">
                                    <div className="deal-top rounded-pill mx-5 p-3">
                                        <h3>PREMIUM</h3>
                                        <h4><span className='sup'>IDR</span> {this.state.premiumPrice/1000}K <span className='font-small'>/ month</span></h4>
                                    </div>
                                    <div className="deal-bottom p-5 mt-n2">
                                        <ul className='deal-item'>
                                            <li>Access to all Movies</li>
                                            <li>HD Available</li>
                                            <li>Cancel Anytime</li>
                                        </ul>
                                    </div>
                                    <div className="container px-5">
                                        <MDBBtn
                                            color='deep-purple rounded-pill'
                                            className='white-text font-weight-bold btn-block mb-4'
                                            style={{letterSpacing:'2px'}}
                                            onClick={this.onUserUpgrade}
                                            >
                                            Upgrade Now
                                        </MDBBtn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user, userSubs}) => {
    return {
        ...user,
        ...userSubs
    }
}

export default connect(mapStateToProps, { navItemChange, calcUserSubs })(Subscription)