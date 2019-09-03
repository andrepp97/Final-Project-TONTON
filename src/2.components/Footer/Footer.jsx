import React, { Component } from 'react'
import Logo from '../../img/wicara-logo.png'


class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small special-color-dark mt-5 pt-5" style={{overflow:'hidden'}}>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <img src={Logo} alt="logo-wicara" height='120px' className='my-n3 ml-5' />
                        <p style={{marginLeft:'2rem'}}>Speak Up Your Mind</p>
                    </div>

                    <div className="col-md-6">
                        <h5>Get In Touch</h5>
                        <div className='mt-5'>
                            {/*WA*/}
                            <a href="https://api.whatsapp.com/send?phone=6281333432070" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-whatsapp fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            {/*Instagram*/}
                            <a href="https://www.instagram.com/andre_pp_/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            {/* Facebook */}
                            <a href="https://www.facebook.com/andre.puterapratama" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            {/*Github*/}
                            <a href="https://github.com/andrepp97" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github fa-lg white-text fa-2x"> </i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer-copyright text-center py-3">© 2019 Copyright - <a href="https://andreputerap.firebaseapp.com/" target='_blank' rel='noopener noreferrer'>Andre Putera Pratama</a>
                </div>

            </footer>
        )
    }
}

export default Footer