import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn, MDBIcon, MDBCard
} from "mdbreact"
import { userLogout } from '../../redux/1.actions'
import windowSize from 'react-window-size'
import Logo from '../../img/tonton.png'


// STYLING //
import '../../App.css'
import './Navbar.css'
// STYLING //


class AppBar extends Component {
    state = {
        isOpen: false
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onLogout = () => {
        this.props.userLogout()
    }


    render() {
        return (
                <MDBNavbar color="deep-purple" dark expand="lg" scrolling transparent fixed='top'>
                    <MDBNavbarBrand>
                        <MDBNavLink to='/home' className='yellow-text'>
                            <img src={Logo} alt="tonton.id" height='72px' className='my-n4' />                            
                        </MDBNavLink>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left className='my-0' style={{fontSize:'14px', letterSpacing:'1px'}}>
                            {
                                this.props.activeTab === 'DISCOVER'
                                ?
                                <MDBNavItem className='font-weight-bold' active>
                                    <MDBNavLink to='/home'>DISCOVER</MDBNavLink>
                                </MDBNavItem>
                                :
                                <MDBNavItem className='font-weight-bold'>
                                    <MDBNavLink to='/home'>DISCOVER</MDBNavLink>
                                </MDBNavItem>
                            }

                            {
                                this.props.activeTab === 'MOVIES'
                                ?
                                <MDBNavItem className='font-weight-bold' active>
                                    <MDBNavLink to='/movies'>MOVIES</MDBNavLink>
                                </MDBNavItem>
                                :
                                <MDBNavItem className='font-weight-bold' >
                                    <MDBNavLink to='/movies'>MOVIES</MDBNavLink>
                                </MDBNavItem>
                            }

                            {
                                this.props.activeTab === 'CAST'
                                ?
                                <MDBNavItem className='font-weight-bold' active>
                                    <MDBNavLink to='/cast'>CAST</MDBNavLink>
                                </MDBNavItem>
                                :
                                <MDBNavItem className='font-weight-bold'>
                                    <MDBNavLink to='/cast'>CAST</MDBNavLink>
                                </MDBNavItem>
                            }
                        </MDBNavbarNav>

                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <form>
                                    <input type="search" placeholder="Search" />
                                </form>
                            </MDBNavItem>
                        {
                            (this.props.name)
                            ?
                            <MDBNavItem className='mr-4'>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav>
                                        <MDBIcon icon="user-circle" style={{ fontSize: '2rem' }} className='white-text' />
                                    </MDBDropdownToggle>

                                    <MDBDropdownMenu right>
                                        <MDBCard className='mt-n2 pt-3 px-4 mb-3'>
                                            <p className='font-weight-bold'>{this.props.name}</p>
                                            <p className='mt-n2 mr-2' style={{fontSize:'12px', color:'grey'}}>{this.props.email}</p>
                                        </MDBCard>

                                        <MDBDropdownItem className='dropItem'><MDBIcon icon="rocket" />
                                            <Link className='text-decoration-none' to='/subscription'>
                                                <span style={{marginLeft:'2px', fontSize:'16px'}}>Subscriptions</span>
                                            </Link>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem className='dropItem'><MDBIcon icon="bookmark" />
                                            <Link className='text-decoration-none' to='/watchlist'>
                                                <span style={{marginLeft:'6px', fontSize:'16px'}}>Watchlist</span>
                                            </Link>
                                        </MDBDropdownItem>

                                        <MDBDropdownItem divider></MDBDropdownItem>
                                        <MDBDropdownItem className='dropItem' style={{ fontSize: '14px' }} onClick={this.onLogout}>
                                            <Link style={{ textDecoration: 'none', marginLeft: '-10px' }} to='/home'>
                                                <MDBIcon icon="power-off" /><span style={{marginLeft:'12px', fontSize:'15px'}}>Logout</span>
                                            </Link>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            :
                            <MDBNavbarNav right>
                                <MDBNavItem className='my-n2 mr-4'>
                                    <MDBNavLink to='/login'>
                                        <MDBBtn color='deep-purple' className='white-text rounded-pill' style={{ letterSpacing:'.5px', fontSize:'14px' }}>
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
        email: state.user.email,
        activeTab: state.user.activeTab
    }
}

export default connect(mapStateToProps, { userLogout })(windowSize(AppBar))