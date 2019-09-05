import React, { Component } from "react";
import { connect } from "react-redux"
import { userLogout } from '../../redux/1.actions'
import { Link } from 'react-router-dom'
import Cookie from "universal-cookie"
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn, MDBCardText, MDBIcon
} from "mdbreact";
import Logo from '../../img/wicara-logo.png'
import '../../App.css'

let cookieObj = new Cookie()


class AppBar extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onLogout = () => {
        cookieObj.remove('userData')
        this.props.userLogout()
    }


    render() {
        return (
                <MDBNavbar color="white" light expand="md" scrolling fixed="top" style={{zIndex:'3', opacity:.95}}>
                    <MDBNavbarBrand>
                        <MDBNavLink to='/'>
                            <img src={Logo} alt="wicara.id" height='75px' className='my-n3' />
                        </MDBNavLink>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem className='itemBro font-weight-bold'>
                                <MDBNavLink to='/'>SPEAKER</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className='itemBro font-weight-bold'>
                                <MDBNavLink to='/'>STORE</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className='itemBro font-weight-bold'>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <span className="mr-1">SESUATU</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem>Belom Tau</MDBDropdownItem>
                                        <MDBDropdownItem>Sebuah Menu</MDBDropdownItem>
                                        <MDBDropdownItem>Mantap</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>

                    <MDBNavbarNav right>
                        {
                            (this.props.name)
                            ?
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" style={{ fontSize: '125%', marginTop: '7px', marginLeft: '5px' }} />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu right className="dropdown-default">
                                        <MDBCardText style={{ paddingLeft: '24px' }}><span style={{ color: 'grey', fontSize: '12px' }}>Hello,</span><br /><strong>{this.props.name}</strong></MDBCardText>
                                        <MDBDropdownItem divider></MDBDropdownItem>

                                        <MDBDropdownItem className='dropItem' style={{ fontSize: '14px' }}><MDBIcon icon="user-cog" />
                                            <Link style={{ textDecoration: 'none', marginLeft: '-6px' }} to='/history'>
                                                &nbsp;Edit Profile
                                                </Link>
                                        </MDBDropdownItem>

                                        <MDBDropdownItem divider></MDBDropdownItem>
                                        <MDBDropdownItem className='dropItem' style={{ fontSize: '14px' }} onClick={this.onLogout}>
                                            <Link style={{ textDecoration: 'none', marginLeft: '-10px' }} to='/'>
                                                <MDBIcon icon="power-off" /> &nbsp;Logout
                                                    </Link>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            :
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBNavLink to='/login'>
                                        <MDBBtn color=''>Login</MDBBtn>
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to='/signup'>
                                        <MDBBtn color="indigo" className='white-text'>Sign Up</MDBBtn>
                                    </MDBNavLink>
                                </MDBNavItem>      
                            </MDBNavbarNav>
                        }
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        name: state.user.username,
        role: state.user.role,
        email: state.user.email
    }
}

export default connect(mapStateToProps, {userLogout})(AppBar)