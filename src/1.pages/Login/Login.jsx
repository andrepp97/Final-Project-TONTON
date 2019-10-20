import React, { Component } from 'react'
import loginImg from '../../img/illustrations/login.svg'
import { MDBInput, MDBBtn } from 'mdbreact'
import { connect } from "react-redux"
import { Redirect, Link } from 'react-router-dom'

// Import Global Functions
import { userLogin, navItemChange } from '../../redux/1.actions'


class Login extends Component {
    state = {
        name: '',
        pass: '',
        nameError: '',
        passError: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.navItemChange('')
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
            email: this.state.name,
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
            return <Redirect to='/home'></Redirect>
        }

        return (
            <div className='wallpaper page'>
                {/* Top Spacing Purpose */}
                <div className='mb-5'>&nbsp;</div>
                <h1 className='mb-5'>&nbsp;</h1>
                {/* Top Spacing Purpose */}

                <div className='container mt-4'>
                    <div className="card col-lg-6 offset-lg-3">
                        <img src={loginImg} alt="login-illustration" height='150px' className='mt-n5 mb-3' />
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <MDBInput outline icon="user" type='text' label='Email' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></MDBInput>
                                <p style={{marginLeft:'2rem'}} className='text-danger font-small mt-n3'>{this.state.nameError}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <MDBInput outline icon="key" type='password' label='Password' value={this.state.pass} onKeyUp={this.onEnter} onChange={(e) => this.setState({ pass: e.target.value })}></MDBInput>
                                <p style={{ marginLeft: '2rem' }} className='text-danger font-small mt-n3'>{this.state.passError}</p>
                            </div>
                        </div>
                        <div className="text-center">
                        {
                            this.props.loading
                            ?
                                <div className='d-flex justify-content-center my-4'>
                                    <div className="spinner-grow text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-success mx-2" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-info" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            :
                                <MDBBtn color='deep-purple'
                                        className='white-text mb-5 mt-4 mx-5 font-weight-bold rounded-pill w-50'
                                        style={{ letterSpacing: '2px' }} onClick={this.onLogin}>
                                    Login
                                </MDBBtn>
                        }
                        </div>
                        
                        <div className="row mb-4">
                            <div className="col-md-10 offset-md-1 text-center">
                                New to TONTON ? &nbsp;
                                <Link to='/signup' className='text-center text-primary text-decoration-none font-weight-bold'>
                                        Create Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                    
                {/* Bottom Spacing */}
                <div className='mt-5'>&nbsp;<br/>&nbsp;</div>
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

export default connect(mapStateToProps, { userLogin, navItemChange })(Login)