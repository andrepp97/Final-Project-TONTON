import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn
} from "mdbreact";
import Logo from '../../img/wicara-logo.png'
import '../../App.css'


class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
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
                            <MDBNavItem className='itemBro'>
                                <MDBNavLink to='/'>SPEAKER</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className='itemBro'>
                                <MDBNavLink to='/'>STORE</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className='itemBro'>
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
                            <MDBNavItem>
                                <MDBNavLink to='/login'>
                                    <MDBBtn color='mdb-color' className='white-text'>Login</MDBBtn>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to='/signup'>
                                    <MDBBtn color="indigo" className='white-text'>Sign Up</MDBBtn>
                                </MDBNavLink>
                            </MDBNavItem>      
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
        );
    }
}

export default NavbarPage;