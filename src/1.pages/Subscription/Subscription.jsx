import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MDBBtn } from 'mdbreact'
import { navItemChange } from '../../redux/1.actions'
import './Subs.css'


class Subscription extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.navItemChange('')
    }

    
    render() {
        if (this.props.userObject.username === '' && this.props.userObject.role === '') {
            return <Redirect to='/home'></Redirect>
        }

        return (
            <div className='wallpaper2 page'>
                {/* Top Spacing Purpose */}
                <h1 className='py-5'>&nbsp;</h1>
                {/* Top Spacing Purpose */}

                <div className='container'>
                    {/* Price Table */}
                    <div className="col-lg-6 offset-lg-3 mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="price card text-center">
                                    <div className="deal-top rounded-pill mx-5 p-3">
                                        <h3>PREMIUM</h3>
                                        <h4><span className='sup'>IDR</span> 149K <span className='font-small'>/ month</span></h4>
                                    </div>
                                    <div className="deal-bottom p-5 mt-n2">
                                        <ul className='deal-item'>
                                            <li>Access to all Movies</li>
                                            <li>HD Available</li>
                                            <li>Cancel Anytime</li>
                                        </ul>
                                    </div>
                                    <div className="container px-5">
                                        <MDBBtn color='deep-purple rounded-pill' className='white-text font-weight-bold mb-4 d-inline-block btn-block' style={{letterSpacing:'1px'}}>
                                            Upgrade Now
                                        </MDBBtn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Spacing */}
                <div className='mt-5'>&nbsp;<br />&nbsp;</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userObject: state.user
    }
}

export default connect(mapStateToProps, { navItemChange })(Subscription)