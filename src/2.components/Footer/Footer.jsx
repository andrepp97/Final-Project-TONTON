import React from "react"
import {connect} from 'react-redux'
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact"
import Logo from '../../img/tonton.png'


const Footer = (props) => {
    if (props.activeTab === 'PAYMENT' || props.activeTab === 'ADMIN') {
        return null
    }

    return (
        <MDBFooter
            color="black"
            className="font-small pt-5 pb-3"
        >
            <MDBContainer className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6 pl-5 mt-n3">
                        <img src={Logo} alt="tonton.id" height="100%" className='mt-n5' />
                        <div className='list-inline mt-n4 ml-2'>
                            <li className='list-inline-item'>
                                <a href="https://www.instagram.com/andre_pp_/" target='_blank' rel="noopener noreferrer">
                                    <MDBIcon fab icon="instagram" style={{fontSize:'24px'}} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.facebook.com/andre.puterapratama" target='_blank' rel="noopener noreferrer">
                                    <MDBIcon fab icon="facebook" style={{ fontSize: '24px' }} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://github.com/andrepp97?tab=repositories" target='_blank' rel="noopener noreferrer">
                                    <MDBIcon fab icon="github" style={{ fontSize: '24px' }} />
                                </a>
                            </li>
                        </div>
                    </MDBCol>
                    <MDBCol md="6 pl-5">
                        <h5 className="title">About TONTON</h5>
                        <ul className='list-group'>
                            <li className="list-unstyled">
                                <a href="#!" className='grey-text'>FAQ</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!" className='grey-text'>Contact Us</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!" className='grey-text'>About Us</a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer className='border-top border-bottom py-4 w-100'>
                    &copy; 2019 Copyright by
                    <a href="http://andreputerap.firebaseapp.com" target='_blank' rel="noopener noreferrer"> Andre Putera Pratama</a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

const mapStateToProps = (state) => {
    return {
        activeTab: state.user.activeTab
    }
}

export default connect(mapStateToProps)(Footer);