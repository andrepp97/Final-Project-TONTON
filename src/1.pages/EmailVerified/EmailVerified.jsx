import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBBtn } from "mdbreact"
import { confirmLogin } from "../../redux/1.actions"
import { urlApi } from '../../3.helpers/database'
import imgConfirm from '../../img/illustrations/confirm.svg'


class EmailVerified extends Component {
    state = {
        loading: true,
        message: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        
        var params = queryString.parse(this.props.location.search)

        axios.post(urlApi + 'user/emailConfirmed', {
            email: params.email
        }).then(res => {
            console.log(res)
            this.setState({ message: 'Email Confirmed Successfully!' })
            localStorage.setItem('token', res.data.token)
            this.props.confirmLogin(res.data)
        }).catch(err => {
            console.log(err.response)
            this.setState({ message: 'Email Confirm Failed!' })
        })
    }


    render() {
        return (
            <div className='page bg-dark white-text text-center pb-5'>
                {/* Top Spacing Purpose */}
                <div className='mb-5'>&nbsp;</div>
                <div className='mb-5'>&nbsp;</div>
                {/* Top Spacing Purpose */}

                <h1>{this.state.message}</h1>
                <Link to='/home'>
                    <MDBBtn color='deep-purple' className='white-text my-5 py-2 py-3 px-4' onClick={this.btnResendEmail}>
                        Discover Movies
                    </MDBBtn>
                </Link>
                <br />
                <img src={imgConfirm} height='250px' alt="CONFIRMATION" />
            </div>
        )
    }
}

export default connect(null, { confirmLogin })(EmailVerified)