import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn, MDBIcon, MDBCard
} from "mdbreact"
import { userLogout } from '../../redux/1.actions'
import windowSize from 'react-window-size'


// STYLING //
import Logo from '../../img/tonton.png'
import '../../App.css'
import './Navbar.css'
// STYLING //


class AppBar extends Component {
    state = {
        isOpen: false,
        searchFocus: false,
        searchValue: '',
        doSearch: false
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onLogout = () => {
        this.props.userLogout()
    }

    onSearch = (event) => {
        if (event.key === 'Enter' && this.state.searchValue !== '') {
            window.location = `/searchResult?q=${this.state.searchValue}`
        }
    }


    render() {
        if (this.props.activeTab === 'ADMIN') {
            return null
        }

        return (
                <MDBNavbar color="deep-purple" dark scrolling transparent fixed='top' expand="lg">
                    <MDBNavbarBrand>
                        <MDBNavLink to='/home'>
                            <img src={Logo} alt="tonton.id" height='72px' className='my-n4' />                            
                        </MDBNavLink>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        {/* NAV MENU */}
                        <MDBNavbarNav left style={{fontSize:'14px', letterSpacing:'1px'}}>
                            <MDBNavItem active={this.props.activeTab === 'DISCOVER' ? true : false}>
                                <MDBNavLink to='/home'>DISCOVER</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={this.props.activeTab === 'MOVIES' ? true : false}>
                                <MDBNavLink to='/movies'>MOVIES</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={this.props.activeTab === 'CAST' ? true : false}>
                                <MDBNavLink to='/cast'>ARTISTS</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        {/* NAV MENU */}
                        <MDBNavbarNav right>
                        {/* SEARCH BAR */}
                            <MDBNavItem>
                                    <input
                                        className='navbarSearch'
                                        type="search"
                                        placeholder={ this.state.searchFocus ? "Find Movies or Artists . . ." : "Search" }
                                        onFocus={() => this.setState({searchFocus:true})}
                                        onBlur={() => this.setState({searchFocus:false})}
                                        onChange={(e) => this.setState({searchValue: e.target.value})}
                                        onKeyUp={this.onSearch}
                                    />
                            </MDBNavItem>
                        {/* SEARCH BAR */}

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
                                            <p className='mt-n2 mr-2 text-dark'>{this.props.email}</p>
                                        </MDBCard>

                                    {
                                        this.props.roleUser === 'Admin' || this.props.roleUser === 'Super Admin'
                                        ?       
                                            <MDBDropdownItem>
                                                <Link to='/admin-dashboard' className='text-decoration-none'>
                                                    <MDBIcon icon="chart-pie" />
                                                    <span className='ml-2'>Dashboard</span>
                                                </Link>
                                            </MDBDropdownItem>
                                        :
                                        <>
                                            <MDBDropdownItem>
                                                <Link to='/subscription' className='text-decoration-none'>
                                                    <MDBIcon icon="rocket" />
                                                    <span className='ml-2'>Subscriptions</span>
                                                </Link>
                                            </MDBDropdownItem>
                                            <MDBDropdownItem>
                                                <Link to='/my-bills' className='text-decoration-none'>
                                                    <MDBIcon icon="receipt" />
                                                    <span className='ml-2'> My Bills</span>
                                                </Link>
                                            </MDBDropdownItem>
                                        </>
                                    }
                                    <MDBDropdownItem>
                                        <Link to='/watchlist' className='text-decoration-none'>
                                            <MDBIcon icon="clock" />
                                            <span className='ml-2'>My Watchlist</span>
                                        </Link>
                                    </MDBDropdownItem>

                                        <MDBDropdownItem divider />
                                        <MDBDropdownItem style={{paddingLeft:'34px'}} onClick={this.onLogout}>
                                            <MDBIcon icon="power-off" />
                                            <span className='ml-2'>Logout</span>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        name: state.user.username,
        roleUser: state.user.role,
        email: state.user.email,
        activeTab: state.user.activeTab
    }
}

export default connect(mapStateToProps, { userLogout })(windowSize(AppBar))