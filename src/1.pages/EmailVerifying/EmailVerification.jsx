import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios'
import { MDBBtn } from 'mdbreact';

import { urlApi } from '../../3.helpers/database'
import imgMail from '../../img/illustrations/mailbox.svg'


class EmailVerify extends Component {

    componentDidMount() {
        window.scrollTo(0,0)
    }
    

    btnResendEmail = () => {
        var params = queryString.parse(this.props.location.search)
        console.log(params)

        axios.post(urlApi + 'user/resendEmailConfirm', {
            email: params.email
        }).then(res => {
            alert(res.data.message)
        }).catch(err => {
            console.log(err.response)
        })
    }


    render() {
        return (
            <div className='page bg-dark white-text text-center pb-5'>
                {/* Top Spacing Purpose */}
                <div className='mb-5'>&nbsp;</div>
                <div className='mb-5'>&nbsp;</div>
                {/* Top Spacing Purpose */}

                <h1>Please Check Your Email To Confirm</h1>
                <h4 className='mt-4'>If you didn't receive an email</h4>
                <MDBBtn color='deep-purple' className='white-text mb-5' onClick={this.btnResendEmail}>
                    Click Here
                </MDBBtn>
                <br/>
                <img src={imgMail} height='250px' alt="MAILBOX"/>
            </div>
        )
    }
}

export default EmailVerify