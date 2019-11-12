import React, { Component } from 'react'
import Axios from 'axios'
import { urlApi } from '../../3.helpers/database'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MDBBtn } from 'mdbreact'
import { navItemChange } from '../../redux/1.actions'
import './Subs.css'


class Subscription extends Component {
    state = {
        premiumPrice: null,
        create_transaction: false
    }

    // LIFECYCLE //
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.navItemChange('')
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

    // USER UPGRADE //
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
    // USER UPGRADE //

    
    render() {
        if (this.props.username === '' && this.props.role === '') {
            return <Redirect to='/home' />
        }

        if (this.state.create_transaction) {
            window.location = `/user-payment`
        }

        return (
            <div className='wallpaper2 page py-5'>
                <h6 className='my-5'>&nbsp;</h6>

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

const mapStateToProps = state => {
    return state.user
}

export default connect(mapStateToProps, { navItemChange })(Subscription)