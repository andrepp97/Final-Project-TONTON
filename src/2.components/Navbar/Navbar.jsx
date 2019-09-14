import React, { Component } from "react";
import { connect } from "react-redux"
import { userLogout } from '../../redux/1.actions'
import { Link } from 'react-router-dom'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn, MDBCardText, MDBIcon
} from "mdbreact";
import windowSize from 'react-window-size'
import Logo from '../../img/tonton.png'
import '../../App.css'

// Cookies
import Cookie from "universal-cookie"
let cookieObj = new Cookie()


class AppBar extends Component {
    state = {
        isOpen: false
    }
    

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onLogout = () => {
        cookieObj.remove('userData')
        this.props.userLogout()
    }


    render() {
        return (
                <MDBNavbar color="deep-purple" dark expand="lg" scrolling transparent fixed='top'>
                    <MDBNavbarBrand>
                        <MDBNavLink to='/' className='yellow-text'>
                            <img src={Logo} alt="tonton.id" height='70px' className='my-n4' />                            
                        </MDBNavLink>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left style={{fontSize:'14px', letterSpacing:'.5px'}}>
                            <MDBNavItem className='itemBro font-weight-bold my-0'>
                                <MDBNavLink to='/'>Explore</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className='itemBro font-weight-bold my-0'>
                                <MDBNavLink to='/'>Movies</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className='itemBro font-weight-bold my-0'>
                                <MDBNavLink to='/'>TV Series</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>

                        <MDBNavbarNav left>
                            <MDBNavItem className = {this.props.windowWidth>=975 ? 'ml-n5 py-0' : 'ml-2 py-3 d-flex align-content-center'} waves>
                                <input style={{fontSize:'13px', width:'16rem'}} type="search" className="rounded-pill form-control" placeholder="Find your movie . . ." />
                            </MDBNavItem>
                        </MDBNavbarNav>

                        <MDBNavbarNav right>
                        {
                            (this.props.name)
                            ?
                            <MDBNavItem className='my-0'>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav>
                                        <MDBIcon icon="user-circle" style={{ fontSize: '175%' }} className='white-text' />
                                    </MDBDropdownToggle>

                                    <MDBDropdownMenu right className="dropdown-default">
                                        <MDBCardText style={{ paddingLeft: '24px' }}><span style={{ color: 'grey', fontSize: '12px' }}>Hello,</span><br /><strong>{this.props.name}</strong></MDBCardText>
                                        <MDBDropdownItem divider></MDBDropdownItem>

                                        <MDBDropdownItem className='dropItem' style={{ fontSize: '14px' }}><MDBIcon icon="rocket" />
                                            <Link style={{ textDecoration: 'none', marginLeft: '-6px' }} to='/'>
                                                &nbsp; Subscriptions
                                            </Link>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem className='dropItem' style={{ fontSize: '14px' }}><MDBIcon icon="clock" />
                                            <Link style={{ textDecoration: 'none', marginLeft: '-6px' }} to='/'>
                                                &nbsp; Watchlist
                                                </Link>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem className='dropItem' style={{ fontSize: '14px' }}><MDBIcon icon="user-cog" />
                                            <Link style={{ textDecoration: 'none', marginLeft: '-6px' }} to='/'>
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
                                <MDBNavItem className='my-n2'>
                                    <MDBNavLink to='/login'>
                                        <MDBBtn color='elegant' className='white-text rounded-pill' style={{ letterSpacing:'.5px', fontSize:'14px' }}>
                                            Login
                                        </MDBBtn>
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

export default connect(mapStateToProps, {userLogout})(windowSize(AppBar))