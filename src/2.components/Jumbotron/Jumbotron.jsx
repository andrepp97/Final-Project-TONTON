import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBJumbotron, MDBBtn, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact";
import Background from '../../img/traintobusan.jpg'


class Jumbotron extends Component {
    render() {
        return (
            <MDBRow>
                <MDBCol>
                    <MDBJumbotron style={{ padding: 0 }}>
                        <MDBCol className="text-white text-center pt-5"
                                style={{ height:'100vh', background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.98)), url(${Background})`, backgroundSize:'cover', backgroundAttachment:'fixed' }}>
                            <MDBCol style={{ transform: 'translateY(100%)' }}>
                                <MDBCardTitle className="h1-responsive px-1 pt-5 mb-4">Upgrade to Premium and Enjoy All Movies</MDBCardTitle>
                                {
                                    this.props.userObject.username === '' && this.props.userObject.role === ''
                                    ?
                                        <Link to='/login' style={{ outline: 'none' }}>
                                            <MDBBtn color="deep-purple" className="p-3">
                                                <span style={{ letterSpacing: '2px' }} className='white-text font-weight-bold'>
                                                   Login To Enjoy <MDBIcon icon="play-circle" className='ml-2' />
                                                </span>
                                            </MDBBtn>
                                        </Link>
                                    :
                                    this.props.userObject.role !== 'User'
                                    ?
                                        <Link to='/admin-dashboard' style={{ outline: 'none' }}>
                                            <MDBBtn color="deep-purple" className="p-3">
                                                <span style={{ letterSpacing: '1px' }} className='white-text'>
                                                    Go To Dashboard <MDBIcon icon="play-circle" className='ml-2' />
                                                </span>
                                            </MDBBtn>
                                        </Link>
                                    :
                                        <Link to='/subscription' style={{ outline: 'none' }}>
                                            <MDBBtn color="deep-purple" className="p-3">
                                                <span style={{ letterSpacing: '1px' }} className='white-text'>
                                                    Take Me There <MDBIcon icon="play-circle" className='ml-2' />
                                                </span>
                                            </MDBBtn>
                                        </Link>
                                }
                            </MDBCol>
                        </MDBCol>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        )
    }
}

const mapStateToProps = state => {
    return {
        userObject: state.user
    }
}

export default connect(mapStateToProps)(Jumbotron)