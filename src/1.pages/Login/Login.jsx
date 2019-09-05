import React, { Component } from 'react'
import loginImg from '../../img/illustrations/login.svg'
import { MDBInput, MDBBtn } from 'mdbreact'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'

// Import Global Functions
import { userLogin } from '../../redux/1.actions'


class Login extends Component {
    state = {
        name: '',
        pass: '',
        nameError: '',
        passError: ''
    }

    validateInput = () => {
        let nameError = ''
        let passError = ''

        if (this.state.name === '') {
            nameError = `Username can't be empty`
        }

        if (this.state.pass === '') {
            passError = 'Please fill the password'
        }

        if (nameError || passError) {
            this.setState({
                nameError,
                passError
            })
            return false
        }

        return true
    }

    submitValid = () => {
        const isValid = this.validateInput()
        let loginObject = {
            username: this.state.name,
            password: this.state.pass
        }

        // Jika input nya valid maka melakukan Login
        if (isValid) {
            this.props.userLogin(loginObject)

            // Clear Form Input
            this.setState({
                nameError: '',
                passError: '',
                name: '',
                pass: ''
            })
        }
    }

    onLogin = () => {
        this.validateInput()
        this.submitValid()
    }

    onEnter = (event) => {
        if (event.key === 'Enter') {
            this.onLogin()
        }
    }


    render() {
        if (this.props.username !== '') {
            return <Redirect to='/'></Redirect>
        }

        return (
            <div className='container'>
                <div className='my-5'>&nbsp;</div>
                <span>&nbsp;</span>
                <div className="my-5 card col-md-6 offset-md-3 ">
                    <img src={loginImg} alt="login-illustration" height='150px' className='mt-n5' />
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <MDBInput outline icon="user" type='text' label='Username' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></MDBInput>
                            <p style={{marginLeft:'2rem'}} className='text-danger font-small mt-n3'>{this.state.nameError}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <MDBInput outline icon="key" type='password' label='Password' value={this.state.pass} onKeyUp={this.onEnter} onChange={(e) => this.setState({ pass: e.target.value })}></MDBInput>
                            <p style={{ marginLeft: '2rem' }} className='text-danger font-small mt-n3'>{this.state.passError}</p>
                        </div>
                    </div>
                    <MDBBtn color='indigo' className='white-text mb-5 mt-4 mx-5 font-weight-bold' onClick={this.onLogin} style={{ letterSpacing:'2px' }}>
                        Login
                    </MDBBtn>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        username: state.user.username
    }
}

export default connect(mapStateToProps, {userLogin})(Login)