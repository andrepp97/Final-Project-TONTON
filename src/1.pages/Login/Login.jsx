import React, { Component } from 'react'
import loginImg from '../../img/illustrations/login.svg'
import { MDBInput, MDBBtn } from 'mdbreact'


class Login extends Component {
    render() {
        return (
            <div className='container'>
                <div className='my-5'>&nbsp;</div>
                <span>&nbsp;</span>
                <div className="my-5 card col-md-6 offset-md-3 ">
                    <img src={loginImg} alt="login-illustration" height='150px' className='mt-n5' />
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <MDBInput outline icon="user" type='text' label='Username'></MDBInput>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <MDBInput outline icon="key" type='password' label='Password'></MDBInput>
                        </div>
                    </div>
                    <MDBBtn color='indigo' className='white-text mb-5 mt-4 mx-5 font-weight-bold' style={{ letterSpacing:'2px' }}>Login</MDBBtn>
                </div>
            </div>
        )
    }
}

export default Login