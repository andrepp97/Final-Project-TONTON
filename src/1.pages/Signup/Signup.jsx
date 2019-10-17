import React, { Component } from 'react'
import signupImg from '../../img/illustrations/register.svg'
import { MDBInput, MDBBtn } from 'mdbreact'
import { connect } from "react-redux"
import { Redirect,Link } from 'react-router-dom'

// Import Global Functions
import { userSignup, navItemChange } from '../../redux/1.actions'


class Signup extends Component {
    state = {
        username: '',
        email: '',
        pass: '',
        pass2: '',
        nameError: '',
        emailError: '',
        passError: '',
        pass2Error: '',
        show: true
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.navItemChange('')
    }

    validateInput = () => {
        let nameError = ''
        let emailError = ''
        let passError = ''
        let pass2Error = ''

        if (this.state.username === '') {
            nameError = `Username can't be empty`
        } else {
            nameError = ''
            this.setState({ nameError })
        }

        if (this.state.email === '' || !this.state.email.includes('@')) {
            emailError = 'Please input a valid email'
        } else {
            emailError = ''
            this.setState({ emailError })
        }

        if (this.state.pass === '') {
            passError = 'Please provide a password'
        } else {
            passError = ''
            this.setState({ passError })
        }

        if (this.state.pass2 !== this.state.pass) {
            this.setState({
                pass2Error: 'Passwords are not the same'
            })
            return false
        }

        if (nameError || emailError || passError || pass2Error) {
            this.setState({
                nameError,
                emailError,
                passError,
                pass2Error
            })
            return false
        }

        return true
    }

    submitValid = () => {
        let signupObject = {
            username: this.state.username,
            password: this.state.pass,
            email: this.state.email
        }

        // Jika input nya valid maka melakukan Register
        const isValid = this.validateInput()
        if (isValid) {
            this.props.userSignup(signupObject)
        }
    }

    onSignup = () => {
        this.validateInput()
        this.submitValid()
    }

    onEnter = (event) => {
        if (event.key === 'Enter') {
            this.onSignup()
        }
    }


    render() {
        if (this.props.username !== '') {
            return <Redirect to='/home'></Redirect>
        }
        if (this.props.success) {
            return <Redirect to={`/emailverification?email=${this.props.emailSuccess}`} />
        }

        return (
            <div className='wallpaper page'>
                {/* Top Spacing Purpose */}
                <div className='mb-5'>&nbsp;</div>
                <h1 className='mb-5'>&nbsp;</h1>
                {/* Top Spacing Purpose */}

                <div className='container mt-4'>
                    <div className="card col-lg-6 offset-lg-3 ">
                        <img src={signupImg} alt="login-illustration" height='150px' className='mt-n5 mb-3' />
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <MDBInput outline icon="user" type='text' label='Username' value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}></MDBInput>
                                <p style={{ marginLeft: '2rem' }} className='text-danger font-small mt-n3'>{this.state.nameError}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <MDBInput outline icon="envelope" type='email' label='Email' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></MDBInput>
                                <p style={{ marginLeft: '2rem' }} className='text-danger font-small mt-n3'>{this.state.emailError}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <MDBInput outline icon="key" type='password' label='Password' value={this.state.pass} onChange={(e) => this.setState({ pass: e.target.value })}></MDBInput>
                                <p style={{ marginLeft: '2rem' }} className='text-danger font-small mt-n3'>{this.state.passError}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <MDBInput outline icon="lock" type='password' label='Repeat Password' value={this.state.pass2} onKeyUp={this.onEnter} onChange={(e) => this.setState({ pass2: e.target.value })}></MDBInput>
                                <p style={{ marginLeft: '2rem' }} className='text-danger font-small mt-n3'>{this.state.pass2Error}</p>
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
                                    <div className="spinner-grow text-success" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-info" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                <MDBBtn color='deep-purple'
                                        className='white-text mb-5 mt-4 mx-5 font-weight-bold rounded-pill w-50'
                                        style={{ letterSpacing: '1px' }}
                                        onClick={this.onSignup}>
                                    Create Account
                                </MDBBtn>
                        }
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-10 offset-md-1 text-center">
                                Already have an account ? &nbsp;
                                <Link to='/login' className='text-center text-decoration-none text-primary text-decoration-none font-bold' style={{letterSpacing:'.5px'}}>
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='mt-5'>&nbsp;<br/>&nbsp;</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        loading: state.userSignup.isLoading,
        success: state.userSignup.success,
        emailSuccess: state.userSignup.emailSuccess
    }
}

export default connect(mapStateToProps, { userSignup, navItemChange })(Signup)